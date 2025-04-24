from flask import Flask, Response, jsonify
import cv2
import mediapipe as mp
import numpy as np
import pickle
from flask_cors import CORS
from svm_classifier import SVM
from gesture_recognition import GestureRecognizer
import os
app = Flask(__name__)
CORS(app)

# Load models
word_model_dict = pickle.load(open('model.p', 'rb'))
word_model = word_model_dict['model']
svm = SVM('model_training/alphabet_svm_pipeline.pkl', 'alphabet')
recognizer = GestureRecognizer()

# MediaPipe setup
mp_hands = mp.solutions.hands
mp_face = mp.solutions.face_detection
hands = mp_hands.Hands(static_image_mode=False, max_num_hands=2, min_detection_confidence=0.3)
face = mp_face.FaceDetection(min_detection_confidence=0.5)

cap = None


def predict_word_from_frame(frame):
    data_aux = []
    frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    hand_results = hands.process(frame_rgb)
    face_results = face.process(frame_rgb)

    if not hand_results.multi_hand_landmarks or not face_results.detections:
        return "nothing"

    detection = face_results.detections[0]
    bbox = detection.location_data.relative_bounding_box
    face_center_y = (bbox.ymin + bbox.height / 2)

    handedness = [h.classification[0].label for h in hand_results.multi_handedness]
    hand_landmarks = hand_results.multi_hand_landmarks
    hand_map = {'Left': None, 'Right': None}

    for i, label in enumerate(handedness):
        hand_map[label] = hand_landmarks[i]

    hand_center_y = None

    for label in ['Left', 'Right']:
        hand = hand_map[label]
        if hand:
            x_coords = [lm.x for lm in hand.landmark]
            y_coords = [lm.y for lm in hand.landmark]
            for x, y in zip(x_coords, y_coords):
                data_aux.extend([x - min(x_coords), y - min(y_coords)])
            if hand_center_y is None:
                hand_center_y = np.mean(y_coords)
        else:
            data_aux.extend([0.0, 0.0] * 21)

    offset = hand_center_y - face_center_y if hand_center_y is not None else 0.0
    data_aux.append(offset)

    if len(data_aux) != 85:
        print("Warning: Feature vector length != 85", len(data_aux))
        return "nothing"

    prediction = word_model.predict([np.asarray(data_aux)])
    return prediction[0]


def generate_frames():
    while True:
        ret, frame = cap.read()
        if not ret:
            break

        word_prediction = predict_word_from_frame(frame)
        results = recognizer.process_frame(frame)
        letter_prediction = svm.predict(results.right_hand_landmarks)
        frame = recognizer.draw_landmarks(frame, results)

        display_text = f"Word: {word_prediction} | Letter: {letter_prediction}"
        x, y = 20, 70
        font = cv2.FONT_HERSHEY_SIMPLEX
        scale = 2.2
        color_white = (255, 255, 255)
        color_black = (0, 0, 0)

        cv2.putText(frame, display_text, (x, y), font, scale, color_black, 10, cv2.LINE_AA)
        cv2.putText(frame, display_text, (x, y), font, scale, color_white, 4, cv2.LINE_AA)

        _, buffer = cv2.imencode('.jpg', frame)
        frame_bytes = buffer.tobytes()

        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')


@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')



@app.route('/predict_word', methods=['GET'])
def predict_word():
    ret, frame = cap.read()
    if not ret:
        return jsonify({'word': 'error'})
    prediction = predict_word_from_frame(frame)
    return jsonify({'word': prediction})


@app.route('/predict_letter', methods=['GET'])
def predict_letter():
    ret, frame = cap.read()
    if not ret:
        return jsonify({'letter': 'error'})
    results = recognizer.process_frame(frame)
    prediction = svm.predict(results.right_hand_landmarks)
    return jsonify({'letter': prediction})

def main():                     # 🛠 wrap the camera + run logic
    global cap
    use_camera = os.getenv("USE_CAMERA", "1") == "1"
    if use_camera:
        cap = cv2.VideoCapture(0)
        if not cap.isOpened():
            print("WARNING: camera not available; continuing without it")
            cap = None
    app.run(debug=False, host='0.0.0.0', port=5001, use_reloader=False)

if __name__ == "__main__":      # 🛠 only executed when you run python app.py
    main()
