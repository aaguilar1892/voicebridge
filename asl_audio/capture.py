import cv2
import mediapipe as mp

class ASLCapture:
    def __init__(self, source=0, max_num_hands=2, detection_confidence=0.5, tracking_confidence=0.5):
        self.cap = cv2.VideoCapture(source)
        if not self.cap.isOpened():
            raise Exception("Webcam could not be opened.")
        self.mp_hands = mp.solutions.hands
        self.hands = self.mp_hands.Hands(
            static_image_mode=False,
            max_num_hands=max_num_hands,
            min_detection_confidence=detection_confidence,
            min_tracking_confidence=tracking_confidence
        )
        self.mp_draw = mp.solutions.drawing_utils

    def get_frame_with_hands(self):
        """Capture a frame and process it with MediaPipe Hands."""
        ret, frame = self.cap.read()
        if not ret:
            return None, None
        # Convert the image color from BGR to RGB
        frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = self.hands.process(frame_rgb)
        return frame, results

    def draw_hand_landmarks(self, frame, results):
        """Draw detected hand landmarks on the frame."""
        if results and results.multi_hand_landmarks:
            for hand_landmarks in results.multi_hand_landmarks:
                self.mp_draw.draw_landmarks(frame, hand_landmarks, self.mp_hands.HAND_CONNECTIONS)
        return frame

    def release(self):
        """Release the webcam resource."""
        self.cap.release()
