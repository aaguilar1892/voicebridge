import React from 'react';
<<<<<<< HEAD

let utterance_practice_mode = new SpeechSynthesisUtterance("Practice Mode");
let utterance_flashcards = new SpeechSynthesisUtterance("Flash card Sets");
let utterance_alphabet = new SpeechSynthesisUtterance("Alphabet");
let utterance_basic_words = new SpeechSynthesisUtterance("Basic Words");

const Practice = () => {

    const handleMouseEnter = (utterance) => {
        speechSynthesis.speak(utterance);
    };
 
 
    const handleMouseLeave = () => {
        speechSynthesis.cancel();
    };

    return (
        <div className="flex flex-col bg-gray-100 items-center p-6 pt-24 min-h-screen">
            <div className="p-8">
                <h1 className="text-6xl font-bold mb-6 text-gray-800"
                 onMouseEnter={() => handleMouseEnter(utterance_practice_mode)}
                 onMouseLeave={handleMouseLeave}
                >
                    Practice Mode
                </h1>
            </div>
                <h2 className="text-4xl font-bold mb-6 text-gray-800"
                 onMouseEnter={() => handleMouseEnter(utterance_flashcards)}
                 onMouseLeave={handleMouseLeave}
                >
                    Flashcard Sets
                </h2>
                <div className="flex flex-row p-10 gap-35 justify-center items-center">
                    <div className="flex bg-yellow-600 rounded-xl text-white p-20 shadow-2xl cursor-pointer justify-center pl-35 pr-35"
                     onMouseEnter={() => handleMouseEnter(utterance_alphabet)}
                     onMouseLeave={handleMouseLeave}
                    >
                        <a href="/voicebridge/Alphabet" className="font-bold text-5xl">Alphabet</a>
                    </div>
                    <div className="flex bg-yellow-600 rounded-xl text-white p-20 shadow-2xl cursor-pointer justify-center pl-30 pr-30"
                     onMouseEnter={() => handleMouseEnter(utterance_basic_words)}
                     onMouseLeave={handleMouseLeave}
                    >
                        <a href="/voicebridge/BasicWords" className="font-bold text-5xl">Basic Words</a>
                    </div>
                </div>
        </div>
    );
};
 
 export default Practice;
=======
import { useNavigate } from 'react-router-dom';

let utterance_tutorial = new SpeechSynthesisUtterance("Go to tutorial mode");
let utterance_flashcards = new SpeechSynthesisUtterance("Go to flashcards mode");
let utterance_practice = new SpeechSynthesisUtterance("Go to practice mode");

const Practice = () => {
  const navigate = useNavigate();

  const handleSpeak = (utterance) => {
    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
  };

  const handleStop = () => {
    speechSynthesis.cancel();
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
>>>>>>> origin/main
