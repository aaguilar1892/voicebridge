import React, { useState } from 'react';
import { motion } from 'framer-motion';

let utterance_alphabet = new SpeechSynthesisUtterance("Alphabet");

function Card({ frontSide, backSide, isFlipped, onClick }) {
  const handleMouseEnter = () => {
    if (!isFlipped) {
      const utterance = new SpeechSynthesisUtterance(frontSide.toLowerCase());
      speechSynthesis.speak(utterance);
    }
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
  

const flashcards = [
    { letter: 'A', img: 'https://1000logos.net/wp-content/uploads/2023/08/ASL-Alphabet-A.png' },
    { letter: 'B', img: 'https://1000logos.net/wp-content/uploads/2023/08/ASL-Alphabet-B-1536x864.png' },
    { letter: 'C', img: 'https://1000logos.net/wp-content/uploads/2023/08/ASL-Alphabet-C-1536x864.png' },
    { letter: 'D', img: 'https://1000logos.net/wp-content/uploads/2023/08/ASL-Alphabet-D-1536x864.png' },
    { letter: 'E', img: 'https://1000logos.net/wp-content/uploads/2023/08/ASL-Alphabet-E.png' },
    { letter: 'F', img: 'https://1000logos.net/wp-content/uploads/2023/08/ASL-Alphabet-F-1536x864.png' },
    { letter: 'G', img: 'https://1000logos.net/wp-content/uploads/2023/08/ASL-Alphabet-G-1536x864.png' },
    { letter: 'H', img: 'https://1000logos.net/wp-content/uploads/2023/08/ASL-Alphabet-H-1536x864.png' },
    { letter: 'I', img: 'https://1000logos.net/wp-content/uploads/2023/08/ASL-Alphabet-I.png' },
    { letter: 'J', img: 'https://1000logos.net/wp-content/uploads/2023/08/ASL-Alphabet-J-1536x864.png' },
    { letter: 'K', img: 'https://1000logos.net/wp-content/uploads/2023/08/ASL-Alphabet-K-1536x864.png' },
    { letter: 'L', img: 'https://1000logos.net/wp-content/uploads/2023/08/ASL-Alphabet-L-1536x864.png' },
    { letter: 'M', img: 'https://1000logos.net/wp-content/uploads/2023/08/ASL-Alphabet-M-1536x864.png' },
    { letter: 'N', img: 'https://1000logos.net/wp-content/uploads/2023/08/ASL-Alphabet-N-1536x864.png' },
    { letter: 'O', img: 'https://1000logos.net/wp-content/uploads/2023/08/ASL-Alphabet-O-1536x864.png' },
    { letter: 'P', img: 'https://1000logos.net/wp-content/uploads/2023/08/ASL-Alphabet-P-1536x864.png' },
    { letter: 'Q', img: 'https://1000logos.net/wp-content/uploads/2023/08/ASL-Alphabet-Q-1536x864.png' },
    { letter: 'R', img: 'https://1000logos.net/wp-content/uploads/2023/08/ASL-Alphabet-R-1536x864.png' },
    { letter: 'S', img: 'https://1000logos.net/wp-content/uploads/2023/08/ASL-Alphabet-S.png' },
    { letter: 'T', img: 'https://1000logos.net/wp-content/uploads/2023/08/ASL-Alphabet-T-1536x864.png' },
    { letter: 'U', img: 'https://1000logos.net/wp-content/uploads/2023/08/ASL-Alphabet-U-1536x864.png' },
    { letter: 'V', img: 'https://1000logos.net/wp-content/uploads/2023/08/ASL-Alphabet-V-1536x864.png' },
    { letter: 'W', img: 'https://1000logos.net/wp-content/uploads/2023/08/ASL-Alphabet-W.png' },
    { letter: 'X', img: 'https://1000logos.net/wp-content/uploads/2023/08/ASL-Alphabet-X-1536x864.png' },
    { letter: 'Y', img: 'https://1000logos.net/wp-content/uploads/2023/08/ASL-Alphabet-Y-1536x864.png' },
    { letter: 'Z', img: 'https://1000logos.net/wp-content/uploads/2023/08/ASL-Alphabet-Z-1536x864.png' },
];

const Alphabet = () => {
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
          onMouseEnter={() => handleMouseEnter(utterance_alphabet)}
          onMouseLeave={handleMouseLeave}
        >
          Alphabet
        </h1>
  
        <Card
          key={currentIndex}
          frontSide={flashcards[currentIndex].letter}
          backSide={flashcards[currentIndex].img}
          isFlipped={isFlipped}
          onClick={() => setIsFlipped((prev) => !prev)}
        />
  
        <div className="flex gap-10 mt-10">
          <button
            onClick={prevCard}
            onMouseEnter={() => speak("Previous letter")}
            onMouseLeave={handleMouseLeave}
            className="text-3xl font-extrabold bg-gray-400 hover:bg-gray-500 text-white py-6 px-10 rounded-2xl shadow-lg transition"
          >
            Previous
          </button>
          <button
            onClick={nextCard}
            onMouseEnter={() => speak("Next letter")}
            onMouseLeave={handleMouseLeave}
            className="text-3xl font-extrabold bg-yellow-600 hover:bg-yellow-700 text-white py-6 px-10 rounded-2xl shadow-lg transition"
          >
            Next
          </button>
        </div>
      </div>
    );
  };
  
  export default Alphabet;
  