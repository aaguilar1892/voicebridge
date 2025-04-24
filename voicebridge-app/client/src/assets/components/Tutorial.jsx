import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Tutorial.css';

const Tutorial = ({ onBack }) => {
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [isRecognizing, setIsRecognizing] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [recognitionResult, setRecognitionResult] = useState(null);
  const [wordDetected, setWordDetected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [detectedLetter, setDetectedLetter] = useState('');

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Enter' && !isRecognizing && !loading) {
        if (selectedLetter) {
          speakInstructions(selectedLetter);
        }
      } else if (event.key === 'ArrowRight' && !isRecognizing && !loading) {
        const currentIndex = Object.keys(aslSigns).indexOf(selectedLetter);
        if (currentIndex < Object.keys(aslSigns).length - 1) {
          const nextLetter = Object.keys(aslSigns)[currentIndex + 1];
          handleLetterClick(nextLetter);
        }
      } else if (event.key === 'ArrowLeft' && !isRecognizing && !loading) {
        const currentIndex = Object.keys(aslSigns).indexOf(selectedLetter);
        if (currentIndex > 0) {
          const prevLetter = Object.keys(aslSigns)[currentIndex - 1];
          handleLetterClick(prevLetter);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedLetter, isRecognizing, loading]);

  const handleNextLetter = () => {
    if (selectedLetter) {
      setRecognitionResult(null);
      setWordDetected(false);
      setDetectedLetter('');
      speakInstructions(selectedLetter);
    }
  };

  const aslSigns = {
    'A': 'Make a fist with the thumb resting alongside the index finger.',
    'B': 'Extend all four fingers upward, keeping them together. Thumb crosses the palm.',
    'C': 'Curve all fingers and thumb into the shape of the letter C.',
    'D': 'Touch the tips of the thumb, middle, ring, and pinky together, with index pointing up.',
    'E': 'Curl fingers down to the palm, with thumb pressing against the fingertips.',
    'F': 'Touch the tip of the index finger to the tip of the thumb, other fingers extended.',
    'G': 'Point index finger and thumb horizontally, others closed.',
    'H': 'Extend index and middle fingers together, horizontally.',
    'I': 'Make a fist and raise the pinky finger.',
    'J': 'Make the I shape and trace the letter J in the air with the pinky.',
    'K': 'Hold index and middle fingers up in a V, thumb between them.',
    'L': 'Extend thumb and index to form an L-shape, others tucked in.',
    'M': 'Tuck thumb under the first three fingers.',
    'N': 'Tuck thumb under the first two fingers.',
    'O': 'Curve all fingers and thumb to touch at the tips, forming an O.',
    'P': 'Make a K shape and point it downward.',
    'Q': 'Make a G shape and point it downward.',
    'R': 'Cross the index and middle fingers.',
    'S': 'Make a fist with the thumb across the front of the fingers.',
    'T': 'Place thumb between index and middle fingers.',
    'U': 'Extend index and middle fingers together pointing upward.',
    'V': 'Extend index and middle fingers in a V shape.',
    'W': 'Extend index, middle, and ring fingers upward.',
    'X': 'Bend index finger like a hook, others in a fist.',
    'Y': 'Extend thumb and pinky, other fingers tucked in.',
    'Z': 'Use the index finger to trace a Z shape in the air.'
  };

  const speakInstructions = (letter) => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel(); // Cancel any ongoing speech
      
      const letterUtterance = new SpeechSynthesisUtterance(`Letter ${letter}.`);
      const instructionUtterance = new SpeechSynthesisUtterance(aslSigns[letter]);
      const practiceUtterance = new SpeechSynthesisUtterance("Try making this sign in front of the camera. You will have 3 seconds to practice.");
      
      letterUtterance.onend = () => {
        window.speechSynthesis.speak(instructionUtterance);
      };

      instructionUtterance.onend = () => {
        window.speechSynthesis.speak(practiceUtterance);
      };

      practiceUtterance.onend = () => {
        startCountdown();
      };

      window.speechSynthesis.speak(letterUtterance);
    }
  };

  const startCountdown = () => {
    setIsRecognizing(true);
    let count = 3;
    setCountdown(count);
    const countdownInterval = setInterval(() => {
      count -= 1;
      if (count > 0) {
        setCountdown(count);
        const countUtterance = new SpeechSynthesisUtterance(count.toString());
        window.speechSynthesis.speak(countUtterance);
      } else {
        clearInterval(countdownInterval);
        setCountdown(null);
        checkSign();
      }
    }, 1000);
    const countUtterance = new SpeechSynthesisUtterance("3");
    window.speechSynthesis.speak(countUtterance);
  };

  const checkSign = async () => {
    if (loading) return;
    setLoading(true);
    setWordDetected(false);

    try {
      const response = await axios.get('http://localhost:5001/predict_letter');
      const prediction = response.data.letter;
      console.log("Prediction result:", prediction);
      setDetectedLetter(prediction || '');

      if (prediction && prediction.trim() === selectedLetter) {
        setRecognitionResult('Correct! Well done!');
        setWordDetected(true);
        const successUtterance = new SpeechSynthesisUtterance('Correct! Well done! Press Enter to try again.');
        window.speechSynthesis.speak(successUtterance);
      } else if (prediction && prediction.trim().toLowerCase() === 'nothing') {
        setRecognitionResult('No sign detected. Please try again.');
        const nothingUtterance = new SpeechSynthesisUtterance('No sign has been displayed. Please try again.');
        window.speechSynthesis.speak(nothingUtterance);
      } else {
        setRecognitionResult('Incorrect. Keep practicing!');
        const failureUtterance = new SpeechSynthesisUtterance('Incorrect. Keep practicing! Press Enter to try again.');
        window.speechSynthesis.speak(failureUtterance);
      }
    } catch (error) {
      console.error('Error checking sign:', error);
      setRecognitionResult('Error checking sign. Please try again.');
    } finally {
      setLoading(false);
      setIsRecognizing(false);
    }
  };

  const handleLetterClick = (letter) => {
    setSelectedLetter(letter);
    setRecognitionResult(null);
    setWordDetected(false);
    setDetectedLetter('');
    speakInstructions(letter);
  };

  const speakText = (text) => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel(); // Cancel any ongoing speech
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="tutorial-container">
      <div className="tutorial-content">
        <div className="flex justify-between items-center mb-8">
          <h1 
            onMouseEnter={() => speakText("American Sign Language Tutorial")}
            onMouseLeave={() => window.speechSynthesis.cancel()}
          >
            ASL Tutorial
          </h1>
          <button
            onClick={onBack}
            className="px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
            onMouseEnter={() => speakText("Go back to practice hub")}
            onMouseLeave={() => window.speechSynthesis.cancel()}
          >
            Back to Practice Hub
          </button>
        </div>
        <p 
          className="tutorial-intro"
          onMouseEnter={() => speakText("Click on any letter to see its sign description and practice with real-time feedback. Use arrow keys to navigate between letters and press Enter to try again after each attempt.")}
          onMouseLeave={() => window.speechSynthesis.cancel()}
        >
          Click on any letter to see its sign description and practice with real-time feedback.
          Use arrow keys to navigate between letters and press Enter to try again after each attempt.
        </p>
        
        <div className="letters-grid">
          {Object.keys(aslSigns).map((letter) => (
            <button
              key={letter}
              className={`letter-button ${selectedLetter === letter ? 'selected' : ''}`}
              onClick={() => handleLetterClick(letter)}
              onMouseEnter={() => !isRecognizing && speakInstructions(letter)}
              onMouseLeave={() => !isRecognizing && window.speechSynthesis.cancel()}
            >
              {letter}
            </button>
          ))}
        </div>

        {selectedLetter && (
          <div className="sign-description">
            <h2 
              onMouseEnter={() => speakText(`Letter ${selectedLetter}`)}
              onMouseLeave={() => window.speechSynthesis.cancel()}
            >
              Letter {selectedLetter}
            </h2>
            <p 
              onMouseEnter={() => speakText(aslSigns[selectedLetter])}
              onMouseLeave={() => window.speechSynthesis.cancel()}
            >
              {aslSigns[selectedLetter]}
            </p>
            {countdown !== null && (
              <div className="countdown">
                Get ready! {countdown}
              </div>
            )}
            {recognitionResult && (
              <div 
                className={`recognition-result ${wordDetected ? 'success' : 'error'}`}
                onMouseEnter={() => speakText(recognitionResult)}
                onMouseLeave={() => window.speechSynthesis.cancel()}
              >
                {recognitionResult}
              </div>
            )}
          </div>
        )}
      </div>

      <div className={`camera-container ${wordDetected ? 'success' : recognitionResult && !wordDetected ? 'error' : ''}`}>
        <img
          src="http://localhost:5001/video_feed"
          alt="Live webcam feed"
          className="camera-feed"
        />
        {detectedLetter && (
          <div 
            className="detected-letter"
            onMouseEnter={() => speakText(`Detected letter: ${detectedLetter}`)}
            onMouseLeave={() => window.speechSynthesis.cancel()}
          >
            {detectedLetter}
          </div>
        )}
        {countdown && (
          <div className="countdown-overlay">
            <span>{countdown}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tutorial; 