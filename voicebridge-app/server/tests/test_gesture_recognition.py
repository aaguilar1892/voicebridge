import pytest
import cv2
import numpy as np
from gesture_recognition import GestureRecognizer

def test_gesture_recognizer_initialization():
    recognizer = GestureRecognizer()
    assert recognizer is not None
    assert recognizer.holistic is not None

def test_process_frame():
    recognizer = GestureRecognizer()
    # Create a test frame
    frame = np.zeros((480, 640, 3), dtype=np.uint8)
    
    results = recognizer.process_frame(frame)
    assert results is not None

def test_draw_landmarks():
    recognizer = GestureRecognizer()
    # Create a test frame
    frame = np.zeros((480, 640, 3), dtype=np.uint8)
    
    # Create mock results
    class MockResults:
        def __init__(self):
            self.pose_landmarks = None
            self.left_hand_landmarks = None
            self.right_hand_landmarks = None
    
    results = MockResults()
    output_frame = recognizer.draw_landmarks(frame, results)
    
    assert output_frame is not None
    assert output_frame.shape == frame.shape

def test_gesture_recognizer_cleanup():
    recognizer = GestureRecognizer()
    recognizer.close()
    # No explicit assertion needed, just ensuring the close method doesn't raise exceptions 