from flask import Flask, Response, jsonify
import cv2
import mediapipe as mp
import numpy as np
import pickle
from flask_cors import CORS
from svm_classifier import SVM
from gesture_recognition import GestureRecognizer

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load word classifier
word_model_dict = pickle.load(open('./model.p', 'rb'))
word_model = word_model_dict['model']

# Load letter classifier (SVM)
letter_model_path = 'model_training/alphabet_svm_pipeline.pkl'
svm = SVM(letter_model_path, 'alphabet')
recognizer = GestureRecognizer()

# Initialize MediaPipe Hands for word classifier
mp_hands = mp.solutions.hands
hands = mp_hands.Hands(static_image_mode=False, max_num_hands=1, min_detection_confidence=0.3)

cap = cv2.VideoCapture(0)


def predict_word_from_frame(frame):
    data_aux = []
    x_, y_ = [], []

    frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    results = hands.process(frame_rgb)

    if results.multi_hand_landmarks:
        hand_landmarks = results.multi_hand_landmarks[0]

        for lm in hand_landmarks.landmark:
            x_.append(lm.x)
            y_.append(lm.y)

        for lm in hand_landmarks.landmark:
            data_aux.append(lm.x - min(x_))
            data_aux.append(lm.y - min(y_))

        while len(data_aux) < 42:
            data_aux.append(0.0)
        if len(data_aux) > 42:
            data_aux = data_aux[:42]

        prediction = word_model.predict([np.asarray(data_aux)])
        return prediction[0]

    return "nothing"


def generate_frames():
    while True:
        ret, frame = cap.read()
        if not ret:
            break

        # Word prediction for overlay
        word_prediction = predict_word_from_frame(frame)

        # Letter prediction for overlay
        results = recognizer.process_frame(frame)
        letter_prediction = svm.predict(results.right_hand_landmarks)
        frame = recognizer.draw_landmarks(frame, results)

        # Display both predictions
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


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)