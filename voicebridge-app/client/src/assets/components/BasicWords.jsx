import React, { useState } from 'react';
import { motion } from 'framer-motion';

let utterance_words = new SpeechSynthesisUtterance("Basic Words");

const flashcards = [
  { text: "Hello", img: "https://res.cloudinary.com/spiralyze/image/upload/f_auto,w_948/BabySignLanguage/DictionaryPages/hello-webp.webp", utterance: new SpeechSynthesisUtterance("Hello") },
  { text: "Goodbye", img: "https://res.cloudinary.com/spiralyze/image/upload/f_auto,w_948/BabySignLanguage/DictionaryPages/goodbye-webp.webp", utterance: new SpeechSynthesisUtterance("Goodbye") },
  { text: "Please", img: "https://res.cloudinary.com/spiralyze/image/upload/f_auto,w_948/BabySignLanguage/DictionaryPages/please-webp.webp", utterance: new SpeechSynthesisUtterance("Please") },
  { text: "Thanks", img: "https://res.cloudinary.com/spiralyze/image/upload/f_auto,w_948/BabySignLanguage/DictionaryPages/thank_you-webp.webp", utterance: new SpeechSynthesisUtterance("Thanks") },
  { text: "Sorry", img: "https://res.cloudinary.com/spiralyze/image/upload/f_auto,w_948/BabySignLanguage/DictionaryPages/sorry-webp.webp", utterance: new SpeechSynthesisUtterance("Sorry") },
  { text: "Yes", img: "https://res.cloudinary.com/spiralyze/image/upload/f_auto,w_948/BabySignLanguage/DictionaryPages/yes-webp.webp", utterance: new SpeechSynthesisUtterance("Yes") },
  { text: "No", img: "https://res.cloudinary.com/spiralyze/image/upload/f_auto,w_948/BabySignLanguage/DictionaryPages/no-webp.webp", utterance: new SpeechSynthesisUtterance("No") },
  { text: "Okay", img: "https://res.cloudinary.com/spiralyze/image/upload/f_auto,w_auto/BabySignLanguage/DictionaryPages/okay.svg", utterance: new SpeechSynthesisUtterance("Okay") },
  { text: "Father", img: "https://res.cloudinary.com/spiralyze/image/upload/f_auto,w_948/BabySignLanguage/DictionaryPages/father-webp.webp", utterance: new SpeechSynthesisUtterance("Father") },
  { text: "Mother", img: "https://res.cloudinary.com/spiralyze/image/upload/f_auto,w_948/BabySignLanguage/DictionaryPages/mommy-webp.webp", utterance: new SpeechSynthesisUtterance("Mother") },
  { text: "I love you", img: "https://res.cloudinary.com/spiralyze/image/upload/f_auto,w_948/BabySignLanguage/DictionaryPages/i_love_you-webp.webp", utterance: new SpeechSynthesisUtterance("I love you") },
  { text: "Excuse me", img: "https://res.cloudinary.com/spiralyze/image/upload/f_auto,w_auto/BabySignLanguage/DictionaryPages/excuse_me.svg", utterance: new SpeechSynthesisUtterance("Excuse me") },
];

function Card({ frontSide, backSide, isFlipped, onClick, utterance }) {
  const handleMouseEnter = () => {
    if (!isFlipped) speechSynthesis.speak(utterance);
  };

  const handleMouseLeave = () => {
    speechSynthesis.cancel();
  };

  return (
    <motion.div
      className='flash-card text-8xl font-bold flex justify-center items-center w-[30rem] h-[22rem] p-6 shadow-2xl bg-white rounded-xl border-4 border-gray-500 shadow-yellow-600 cursor-pointer'
      onClick={onClick}
      initial={{ scale: 0.7, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    >
      {isFlipped ? (
        <img src={backSide} className="object-contain h-full" alt="ASL sign" />
      ) : (
        <span onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          {frontSide}
        </span>
      )}
    </motion.div>
  );
}

const BasicWords = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleMouseEnter = (utterance) => {
    speechSynthesis.speak(utterance);
  };

  const handleMouseLeave = () => {
    speechSynthesis.cancel();
  };

  const speak = (text) => {
    speechSynthesis.cancel();
    speechSynthesis.speak(new SpeechSynthesisUtterance(text));
  };

  const nextCard = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % flashcards.length);
  };

  const prevCard = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
  };

  return (
    <div className="pt-24 pb-40 flex flex-col items-center">
      <h1
        className="text-4xl font-extrabold mb-6"
        onMouseEnter={() => handleMouseEnter(utterance_words)}
        onMouseLeave={handleMouseLeave}
      >
        Basic Words
      </h1>

      <Card
        key={currentIndex}
        frontSide={flashcards[currentIndex].text}
        backSide={flashcards[currentIndex].img}
        isFlipped={isFlipped}
        onClick={() => setIsFlipped((prev) => !prev)}
        utterance={flashcards[currentIndex].utterance}
      />

      <div className="flex gap-10 mt-10">
        <button
          onClick={prevCard}
          onMouseEnter={() => speak("Previous word")}
          onMouseLeave={handleMouseLeave}
          className="text-3xl font-extrabold bg-gray-400 hover:bg-gray-500 text-white py-6 px-10 rounded-2xl shadow-lg transition"
        >
          Previous
        </button>
        <button
          onClick={nextCard}
          onMouseEnter={() => speak("Next word")}
          onMouseLeave={handleMouseLeave}
          className="text-3xl font-extrabold bg-yellow-600 hover:bg-yellow-700 text-white py-6 px-10 rounded-2xl shadow-lg transition"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BasicWords;
