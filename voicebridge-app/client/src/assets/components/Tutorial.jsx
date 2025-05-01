import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Tutorial.css';

const Tutorial = ({ onBack }) => {
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [isRecognizing, setIsRecognizing] = useState(false);
  const [recognitionResult, setRecognitionResult] = useState(null);
  const [wordDetected, setWordDetected] = useState(false);
  const [detectedLetter, setDetectedLetter] = useState('');
  const [ttsEnabled, setTtsEnabled] = useState(() => {
    return localStorage.getItem('ttsEnabled') !== 'false';
  });
  const [showTTSOverlay, setShowTTSOverlay] = useState(false);
  const [flashMessage, setFlashMessage] = useState('');
  const [voices, setVoices] = useState([]);
  const [selectedVoiceURI, setSelectedVoiceURI] = useState(() => {
    return localStorage.getItem('ttsVoiceURI') || '';
  });

  const aslSigns = {
    A: 'Make a fist with the thumb resting alongside the index finger.',
    B: 'Extend all four fingers upward, keeping them together. Thumb crosses the palm.',
    C: 'Curve all fingers and thumb into the shape of the letter C.',
    D: 'Touch the tips of the thumb, middle, ring, and pinky together, with index pointing up.',
    E: 'Curl fingers down to the palm, with thumb pressing against the fingertips.',
    F: 'Touch the tip of the index finger to the tip of the thumb, other fingers extended.',
    G: 'Point index finger and thumb horizontally, others closed.',
    H: 'Extend index and middle fingers together, horizontally.',
    I: 'Make a fist and raise the pinky finger.',
    J: 'Make the I shape and trace the letter J in the air with the pinky.',
    K: 'Hold index and middle fingers up in a V, thumb between them.',
    L: 'Extend thumb and index to form an L-shape, others tucked in.',
    M: 'Tuck thumb under the first three fingers.',
    N: 'Tuck thumb under the first two fingers.',
    O: 'Curve all fingers and thumb to touch at the tips, forming an O.',
    P: 'Make a K shape and point it downward.',
    Q: 'Make a G shape and point it downward.',
    R: 'Cross the index and middle fingers.',
    S: 'Make a fist with the thumb across the front of the fingers.',
    T: 'Place thumb between index and middle fingers.',
    U: 'Extend index and middle fingers together pointing upward.',
    V: 'Extend index and middle fingers in a V shape.',
    W: 'Extend index, middle, and ring fingers upward.',
    X: 'Bend index finger like a hook, others in a fist.',
    Y: 'Extend thumb and pinky, other fingers tucked in.',
    Z: 'Use the index finger to trace a Z shape in the air.'
  };

  useEffect(() => {
    const loadVoices = () => {
      const all = window.speechSynthesis.getVoices();
      const filtered = all.filter(v =>
        (v.lang === 'en-US' || v.lang === 'en-GB') &&
        v.name.toLowerCase().includes('google')
      );
      setVoices(filtered);
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const speakText = (text) => {
    window.speechSynthesis.cancel();
    if (!ttsEnabled || !text) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.65;
    utterance.pitch = 1.0;
    const voice = voices.find(v => v.voiceURI === selectedVoiceURI);
    if (voice) utterance.voice = voice;
    window.speechSynthesis.speak(utterance);
  };

  const handleLetterClick = (letter) => {
    window.speechSynthesis.cancel();
    setSelectedLetter(letter);
    setRecognitionResult(null);
    setWordDetected(false);
    setDetectedLetter('');
    setIsRecognizing(true);

    if (!ttsEnabled) return;

    const step1 = new SpeechSynthesisUtterance(`Letter ${letter}.`);
    const step2 = new SpeechSynthesisUtterance(aslSigns[letter]);
    const step3 = new SpeechSynthesisUtterance('Can you try signing it?');

    [step1, step2, step3].forEach((s) => {
      s.lang = 'en-US';
      s.rate = 0.65;
      s.pitch = 1.0;
      const voice = voices.find(v => v.voiceURI === selectedVoiceURI);
      if (voice) s.voice = voice;
    });

    step1.onend = () => setTimeout(() => window.speechSynthesis.speak(step2), 500);
    step2.onend = () => setTimeout(() => window.speechSynthesis.speak(step3), 600);
    window.speechSynthesis.speak(step1);
  };

  useEffect(() => {
    if (!isRecognizing) return;
    const interval = setInterval(async () => {
      try {
        const response = await axios.get('http://localhost:5001/predict_letter');
        const prediction = response.data.letter?.trim().toUpperCase();
        if (prediction) {
          setDetectedLetter(prediction);
          if (selectedLetter && prediction === selectedLetter && !wordDetected) {
            setRecognitionResult('Correct! Well done!');
            setWordDetected(true);
            speakText('Correct! Well done!');
            setIsRecognizing(false);
          }
        }
      } catch (err) {
        console.error('Prediction error:', err);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [isRecognizing, selectedLetter, wordDetected, ttsEnabled]);

  useEffect(() => {
    const keys = Object.keys(aslSigns);
    const handleKeyDown = (e) => {
      const index = keys.indexOf(selectedLetter);
      if (e.key === 'Enter' && selectedLetter) handleLetterClick(selectedLetter);
      else if (e.key === 'ArrowRight' && index < keys.length - 1) handleLetterClick(keys[index + 1]);
      else if (e.key === 'ArrowLeft' && index > 0) handleLetterClick(keys[index - 1]);
      else if (e.key === 'Shift') {
        setTtsEnabled(prev => {
          const next = !prev;
          localStorage.setItem('ttsEnabled', next);
          setFlashMessage(`Text-to-Speech is now ${next ? 'ON' : 'OFF'}`);
          setShowTTSOverlay(true);
          setTimeout(() => setShowTTSOverlay(false), 2300);
          window.speechSynthesis.cancel();
          return next;
        });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedLetter]);

  const handleVoiceChange = (e) => {
    setSelectedVoiceURI(e.target.value);
    localStorage.setItem('ttsVoiceURI', e.target.value);
  };

  return (
    <div className="tutorial-container">
      <div className="tutorial-content">
        <div className="flex justify-between items-center mb-8">
          <h1 onMouseEnter={() => speakText("ASL Tutorial")}>ASL Tutorial</h1>
          <button onClick={onBack} className="btn btn-yellow">Back to Practice Hub</button>
        </div>

        <p className="tutorial-intro" onMouseEnter={() =>
          speakText("Click a letter to learn how to sign it. Use arrow keys to move, Enter to retry. This page helps you practice ASL signs with voice and camera feedback.")
        }>
          Click a letter to learn how to sign it. Use arrow keys to move, Enter to retry. This page helps you practice ASL signs with voice and camera feedback.
        </p>

        {showTTSOverlay && <div className="tts-flash-overlay-inline">{flashMessage}</div>}

        <select className="voice-dropdown" value={selectedVoiceURI} onChange={handleVoiceChange}>
          <option value="">Default Voice</option>
          {voices.map(v => (
            <option key={v.voiceURI} value={v.voiceURI}>
              {v.name} ({v.lang})
            </option>
          ))}
        </select>

        <div className="letters-grid">
          {Object.keys(aslSigns).map(letter => (
            <button
              key={letter}
              className={`letter-button ${selectedLetter === letter ? 'selected' : ''}`}
              onClick={() => handleLetterClick(letter)}
            >
              {letter}
            </button>
          ))}
        </div>

        {selectedLetter && (
          <div className="sign-description">
            <h2>Letter {selectedLetter}</h2>
            <p>{aslSigns[selectedLetter]}</p>
            {recognitionResult && (
              <div className={`recognition-result ${wordDetected ? 'success' : 'error'}`}>
                {recognitionResult}
              </div>
            )}
          </div>
        )}
      </div>

      <div className={`camera-container ${wordDetected ? 'success' : recognitionResult && !wordDetected ? 'error' : ''}`}>
        <img src="http://localhost:5001/video_feed" alt="Live webcam feed" className="camera-feed" />
        <div className="detected-letter">Detected: {detectedLetter || '...'}</div>
      </div>
    </div>
  );
};

export default Tutorial;
