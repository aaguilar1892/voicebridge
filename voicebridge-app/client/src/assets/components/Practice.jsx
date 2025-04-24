import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTTS } from '../context/useTTS'; 

let utterance_tutorial = new SpeechSynthesisUtterance("Go to tutorial mode");
let utterance_flashcards = new SpeechSynthesisUtterance("Go to flashcards mode");
let utterance_practice = new SpeechSynthesisUtterance("Go to practice mode");

const Practice = () => {
  const navigate = useNavigate();
  const { ttsEnabled } = useTTS(); // Get TTS state

  const handleSpeak = (utterance) => {
    if (ttsEnabled) {
      speechSynthesis.cancel();
      speechSynthesis.speak(utterance);
    }
  };

  const handleStop = () => {
    if (ttsEnabled) speechSynthesis.cancel();
  };

  const tabStyle =
    "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white text-5xl font-extrabold py-10 rounded-[3rem] shadow-2xl " +
    "transition-transform duration-300 ease-in-out transform hover:scale-110 hover:shadow-yellow-700";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 pt-24 px-6 pb-32">
      <h1 className="text-6xl font-extrabold text-gray-800 mb-16">Practice Hub</h1>

      <div className="flex flex-col gap-12 w-full max-w-5xl items-center">
        <button
          onClick={() => navigate('/practice/tutorial')}
          onMouseEnter={() => handleSpeak(utterance_tutorial)}
          onMouseLeave={handleStop}
          className={tabStyle + " w-full max-w-4xl"}
        >
          Tutorial Mode
        </button>

        <button
          onClick={() => navigate('/practice/flashcards')}
          onMouseEnter={() => handleSpeak(utterance_flashcards)}
          onMouseLeave={handleStop}
          className={tabStyle + " w-full max-w-4xl"}
        >
          Flashcards Mode
        </button>

        <button
          onClick={() => navigate('/practice/exercises')}
          onMouseEnter={() => handleSpeak(utterance_practice)}
          onMouseLeave={handleStop}
          className={tabStyle + " w-full max-w-4xl"}
        >
          Practice Mode
        </button>
      </div>
    </div>
  );
};

export default Practice;
