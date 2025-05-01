import pytest
import numpy as np
from unittest.mock import patch, MagicMock
from svm_classifier import SVM

@pytest.fixture
def mock_model():
    mock_model = MagicMock()
    mock_model.predict.return_value = [0]  # Predicts 'A'
    return mock_model

@pytest.fixture
def mock_joblib():
    with patch('joblib.load') as mock_load:
        mock_model = MagicMock()
        mock_model.predict.return_value = [0]  # Predicts 'A'
        mock_load.return_value = mock_model
        yield mock_load

def test_svm_initialization(mock_joblib):
    svm = SVM('dummy_path.pkl', 'alphabet')
    assert svm is not None
    assert len(svm.landmarks) == 63
    assert len(svm.label_dict) == 29  # 26 letters + 'del' + 'nothing' + 'space'

def test_svm_predict_with_landmarks(mock_joblib):
    svm = SVM('dummy_path.pkl', 'alphabet')
    
    # Create mock landmarks
    class MockLandmark:
        def __init__(self, x, y, z):
            self.x = x
            self.y = y
            self.z = z
    
    class MockHandLandmarks:
        def __init__(self):
            self.landmark = [MockLandmark(0.1, 0.2, 0.3) for _ in range(21)]
    
    mock_landmarks = MockHandLandmarks()
    prediction = svm.predict(mock_landmarks)
    
    assert prediction == 'A'  # Based on mock_model.predict returning [0]

def test_svm_predict_without_landmarks(mock_joblib):
    svm = SVM('dummy_path.pkl', 'alphabet')
    prediction = svm.predict(None)
    assert prediction == 'nothing'

def test_svm_invalid_mode(mock_joblib):
    with pytest.raises(NotImplementedError):
        SVM('dummy_path.pkl', 'invalid_mode') 