import pytest
import os
import sys
from unittest.mock import patch

# Add the parent directory to the Python path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

# Import app module after adding to path
from app import cap

@pytest.fixture(autouse=True)
def setup_test_environment():
    # Set up any test environment variables
    os.environ['USE_CAMERA'] = '0'  # Disable camera for tests
    
    # Ensure cap is None at the start of each test
    globals()['cap'] = None
    yield
    
    # Clean up after tests if needed
    if cap is not None:
        cap.release()
        globals()['cap'] = None 