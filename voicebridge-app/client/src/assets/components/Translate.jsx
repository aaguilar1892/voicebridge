import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {
  CheckCircleIcon,
  XCircleIcon,
  SpeakerWaveIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { useTTS } from '../context/useTTS';

const Translate = () => {
  const { ttsEnabled } = useTTS(); // TTS state from context
  
  const speakText = (text) => {
    if (!text || !ttsEnabled) return;
    console.log("Trying to speak:", text); // Add this
    speechSynthesis.cancel();
    const waitUntilReady = () => {
      if (!speechSynthesis.speaking && !speechSynthesis.pending) {
        const utterance = new SpeechSynthesisUtterance(text.toLowerCase());
        utterance.lang = 'en-US';
        speechSynthesis.speak(utterance);
      } else {
        setTimeout(waitUntilReady, 50);
      }
    };
    waitUntilReady();
  };

  const [text, setText] = useState('');
  const [isWebcamOn, setIsWebcamOn] = useState(true);
  const [wordDetected, setWordDetected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [mode, setMode] = useState('word');
  const [countdown, setCountdown] = useState(null);
  const modeRef = useRef(mode);

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  const handleHoverSpeak = (message) => {
    if (ttsEnabled) speakText(message);
  };

  const handleStopSpeak = () => {
    if (ttsEnabled) speechSynthesis.cancel();
  };

  const fetchPrediction = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const currentMode = modeRef.current;
      const endpoint = currentMode === 'word' ? 'predict_word' : 'predict_letter';
      const response = await axios.get(`http://localhost:5001/${endpoint}`);
      const prediction = currentMode === 'word' ? response.data.word : response.data.letter;
      const cleaned = prediction ? prediction.trim() : '';

      if (cleaned.toLowerCase() !== 'nothing' && cleaned !== '') {
        setText((prevText) => {
          const newText = prevText + cleaned + (currentMode === 'word' ? ' ' : '');
          speakText(cleaned);
          return newText;
        });
        setWordDetected(true);
      } else {
        setWordDetected(false);
      }

      setButtonClicked(true);
    } catch (error) {
      console.error('Error fetching prediction:', error);
      setWordDetected(false);
      setButtonClicked(true);
    } finally {
      setLoading(false);
    }
  };

  const startCountdownAndFetch = () => {
    let count = 3;
    setCountdown(count);
    const countdownInterval = setInterval(() => {
      count -= 1;
      if (count > 0) {
        setCountdown(count);
        speakText(`${count}`);
      } else {
        clearInterval(countdownInterval);
        setCountdown(null);
        fetchPrediction();
      }
    }, 1000);
    speakText("3");
  };

  const speakFullPhrase = () => {
    if (text.trim() === '') return;
    speakText(text);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === 'Enter' && !loading) {
        startCountdownAndFetch();
      } else if (event.code === 'KeyS' && event.shiftKey) {
        setMode((prev) => (prev === 'word' ? 'letter' : 'word'));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [loading]);

  useEffect(() => {
    if (!loading) {
      const resetState = setTimeout(() => {
        setButtonClicked(false);
        setWordDetected(false);
      }, 500);
      return () => clearTimeout(resetState);
    }
  }, [loading]);

  return (
    <div className="flex flex-col items-center bg-gray-100 p-6 pt-24 min-h-screen" role="main">
      <h1
        className="text-5xl font-bold mb-6 text-gray-800"
        onMouseEnter={() =>
          handleHoverSpeak(
            "Welcome to translate. Press Enter to capture a word or letter from the webcam. Press Shift and S to switch modes."
          )
        }
        onMouseLeave={handleStopSpeak}
      >
        Welcome to Translate!
      </h1>

      <div
        className="self-center mt-2 px-4 py-2 text-gray-800 font-bold rounded-full text-2xl"
        onMouseEnter={() => handleHoverSpeak(`Current mode: ${mode}. Press Shift and S to switch.`)}
        onMouseLeave={handleStopSpeak}
        aria-label={`Current mode: ${mode}`}
      >
        Press Shift + S to Switch
      </div>

      <div className="w-full max-w-6xl flex flex-col gap-6">
        <div className="flex justify-center gap-4 mt-2">
          <button
            onClick={() => setMode('word')}
            className={`px-6 py-2 rounded-full text-lg font-semibold transition ${
              mode === 'word' ? 'bg-blue-700 text-white' : 'bg-white border border-blue-700 text-blue-700'
            }`}
          >
            Capture Word
          </button>
          <button
            onClick={() => setMode('letter')}
            className={`px-6 py-2 rounded-full text-lg font-semibold transition ${
              mode === 'letter' ? 'bg-blue-700 text-white' : 'bg-white border border-blue-700 text-blue-700'
            }`}
          >
            Capture Letter
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div
            className={`relative flex-[4] ml-4 md:ml-8 min-h-[320px] bg-white rounded-xl shadow-lg overflow-hidden aspect-video transition-all ${
              wordDetected ? 'border-4 border-green-500' : buttonClicked && !wordDetected ? 'border-4 border-red-500' : 'border-4 border-gray-300'
            }`}
            aria-label="Webcam feed area"
          >
            {isWebcamOn ? (
              <img
                src="http://localhost:5001/video_feed"
                alt="Live webcam feed"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-300">
                <span className="text-gray-600 text-lg">Webcam Off</span>
              </div>
            )}

            {countdown && (
              <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                <span className="text-white text-9xl font-bold">{countdown}</span>
              </div>
            )}

            {wordDetected && (
              <div className="absolute top-4 right-4 bg-green-500 rounded-full p-2 shadow-lg animate-ping">
                <CheckCircleIcon className="w-8 h-8 text-white" />
              </div>
            )}

            {buttonClicked && !wordDetected && (
              <div className="absolute top-4 right-4 bg-red-500 rounded-full p-2 shadow-lg animate-ping">
                <XCircleIcon className="w-8 h-8 text-white" />
              </div>
            )}
          </div>

          <div className="relative flex-[2]">
            <textarea
              value={text}
              className="w-full p-6 border border-gray-400 rounded-xl text-4xl font-bold font-mono focus:ring-4 focus:ring-yellow-600 resize-none overflow-y-auto h-[400px] placeholder-gray-500"
              placeholder="Captured text will appear here..."
              readOnly
              aria-label="Captured text textbox"
            />
            {text && (
              <button
                onClick={() => setText('')}
                onMouseEnter={() => handleHoverSpeak('Clear textbox')}
                onMouseLeave={handleStopSpeak}
                className="absolute top-4 right-4 bg-yellow-500 hover:bg-yellow-600 text-white p-3 rounded-lg shadow transition focus:outline-none focus:ring-2 focus:ring-yellow-700"
                aria-label="Clear textbox"
              >
                <TrashIcon className="w-8 h-8" />
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-4">
          <button
            onClick={startCountdownAndFetch}
            disabled={loading}
            onMouseEnter={() => handleHoverSpeak(`Capture a ${mode}. You can also press Enter.`)}
            onMouseLeave={handleStopSpeak}
            className={`px-8 py-4 ${
              loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
            } text-white text-2xl font-bold rounded-lg transition`}
          >
            {loading ? 'Capturing...' : `Capture ${mode.charAt(0).toUpperCase() + mode.slice(1)} (Press Enter)`}
          </button>

          <button
            onClick={() => setIsWebcamOn(!isWebcamOn)}
            onMouseEnter={() => handleHoverSpeak(isWebcamOn ? 'Turn off webcam' : 'Turn on webcam')}
            onMouseLeave={handleStopSpeak}
            className="px-8 py-4 bg-yellow-600 text-white text-2xl font-bold rounded-lg hover:bg-yellow-700 transition"
          >
            {isWebcamOn ? 'Turn Off Webcam' : 'Turn On Webcam'}
          </button>

          <button
            onClick={speakFullPhrase}
            onMouseEnter={() => handleHoverSpeak('Speak full phrase')}
            onMouseLeave={handleStopSpeak}
            className="flex items-center gap-2 px-8 py-4 bg-blue-500 hover:bg-blue-700 text-white text-2xl font-bold rounded-lg transition"
          >
            <SpeakerWaveIcon className="w-7 h-7" />
            Speak Phrase
          </button>
        </div>
      </div>

      <div className="h-20"></div>
    </div>
  );
};

export default Translate;
