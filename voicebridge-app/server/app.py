from flask import Flask, Response, jsonify
from flask_cors import CORS
import cv2
import mediapipe as mp
import joblib
import numpy as np
from gesture_recognition import GestureRecognizer
from svm_classifier import SVM

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

# Initialize GestureRecognizer and SVM model
model_path = 'model_training/alphabet_svm_pipeline.pkl'
svm = SVM(model_path, 'alphabet')
recognizer = GestureRecognizer()

# OpenCV Video Capture
cap = cv2.VideoCapture(0)

latest_prediction = "nothing"  # Store the latest letter prediction

def generate_frames():
    global latest_prediction
    while True:
        ret, frame = cap.read()
        if not ret:
            break

        # Process frame and predict the letter
        results = recognizer.process_frame(frame)
        frame = recognizer.draw_landmarks(frame, results)
        pred = svm.predict(results.right_hand_landmarks)

        # Update the latest predicted letter
        latest_prediction = pred

        # Display prediction on frame
        cv2.putText(frame, pred, (50, 100), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2)

        # Encode and yield the frame
        ret, jpeg = cv2.imencode('.jpg', frame)
        if not ret:
            continue
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + jpeg.tobytes() + b'\r\n\r\n')

@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/predict_letter', methods=['GET'])
def predict_letter():
    return jsonify({"letter": latest_prediction})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)
