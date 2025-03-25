from flask import Flask, Response
from flask_cors import CORS
import cv2
import mediapipe as mp
import joblib
import numpy as np
from gesture_recognition import GestureRecognizer
from svm_classifier import SVM

app = Flask(__name__)
CORS(app)  # Enable CORS to allow React frontend to access Flask API

# Initialize the SVM and GestureRecognizer
model_path = 'model_training/alphabet_svm_pipeline.pkl'  # Update with the correct model path
svm = SVM(model_path, 'alphabet')
recognizer = GestureRecognizer()

# OpenCV Video Capture
cap = cv2.VideoCapture(0)  # Use the correct camera device

def generate_frames():
    while True:
        ret, frame = cap.read()
        if not ret:
            break

        # Process frame to get landmark detection results
        results = recognizer.process_frame(frame)
        # Draw the landmarks on the frame
        frame = recognizer.draw_landmarks(frame, results)
        
        # Get the predicted gesture
        pred = svm.predict(results.right_hand_landmarks)
        
        # Put the prediction text on the frame
        cv2.putText(frame, pred, (50, 100), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2)

        # Convert frame to JPEG format to send as HTTP response
        ret, jpeg = cv2.imencode('.jpg', frame)
        if not ret:
            continue
        # Yield the frame to Flask in the required format
        frame_data = jpeg.tobytes()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame_data + b'\r\n\r\n')

@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)  # Running Flask on port 5001
