# capture.py
import cv2
from gesture_recognition import GestureRecognizer

def main():
    cap = cv2.VideoCapture(1)
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

        cv2.imshow('Camera Feed with Landmarks', frame)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    # Clean up resources
    cap.release()
    recognizer.close()
    cv2.destroyAllWindows()

if __name__ == '__main__':
    main()
