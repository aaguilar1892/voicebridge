import pytest
import os
import sys
import cv2
import numpy as np
from unittest.mock import patch, MagicMock

# Add the parent directory to the Python path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

# Import app module after adding to path
from app import app, predict_word_from_frame, init_camera, cap

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

@pytest.fixture(autouse=True)
def mock_camera():
    with patch('cv2.VideoCapture') as mock_capture:
        mock_capture.return_value.isOpened.return_value = True
        mock_capture.return_value.read.return_value = (True, np.zeros((480, 640, 3), dtype=np.uint8))
        yield mock_capture

@pytest.fixture(autouse=True)
def setup_camera():
    # Initialize camera before each test
    init_camera()
    yield
    # Clean up after each test
    if cap is not None:
        cap.release()
        globals()['cap'] = None

def test_video_feed_endpoint(client, mock_camera):
    response = client.get('/video_feed')
    assert response.status_code == 200
    assert response.mimetype == 'multipart/x-mixed-replace'

def test_predict_word_endpoint(client, mock_camera):
    response = client.get('/predict_word')
    assert response.status_code == 200
    assert 'word' in response.json

def test_predict_letter_endpoint(client, mock_camera):
    response = client.get('/predict_letter')
    assert response.status_code == 200
    assert 'letter' in response.json

def test_predict_word_from_frame():
    # Create a test frame
    frame = np.zeros((480, 640, 3), dtype=np.uint8)
    
    # Test with no hands or face detected
    result = predict_word_from_frame(frame)
    assert result == "nothing" 