# capture.py
import cv2
from gesture_recognition import GestureRecognizer
from svm_classifier import SVM

# Text attributes for window
org = (50, 100)
fontFace = cv2.FONT_HERSHEY_SIMPLEX
fontScale = 1
color = (255, 255, 255)  # White color
thickness = 2

model_path = 'Python work\\model_training\\alphabet_svm_pipeline.pkl' # path for model weights

def main():
    svm = SVM(model_path, 'alphabet')

    cap = cv2.VideoCapture(0)
    if not cap.isOpened():
        print("Cannot open camera")
        return

    # Create an instance of GestureRecognizer
    recognizer = GestureRecognizer()

    while True:
        ret, frame = cap.read()
        if not ret:
            print("Can't receive frame (stream end?). Exiting ...")
            break

        # Process frame to get landmark detection results
        results = recognizer.process_frame(frame)
        # Draw the landmarks on the frame
        frame = recognizer.draw_landmarks(frame, results)
        # Get prediction from svm
        pred = svm.predict(results.right_hand_landmarks)
    
        cv2.putText(frame, pred, org, fontFace, fontScale, color, thickness)
        cv2.imshow('Camera Feed with Landmarks', frame)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    # Clean up resources
    cap.release()
    recognizer.close()
    cv2.destroyAllWindows()
    print(landmarks)

if __name__ == '__main__':
    main()
