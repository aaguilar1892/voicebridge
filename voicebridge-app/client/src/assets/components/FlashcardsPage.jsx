import React from 'react';

let utterance_pick = new SpeechSynthesisUtterance("Pick a set of flash cards to begin");
let utterance_flashcards = new SpeechSynthesisUtterance("Flash card Sets");
let utterance_alphabet = new SpeechSynthesisUtterance("Alphabet");
let utterance_basic_words = new SpeechSynthesisUtterance("Basic Words");

const Flashcards = () => {


   const handleMouseEnter = (utterance) => {
       speechSynthesis.speak(utterance);
   };
   const handleMouseLeave = () => {
       speechSynthesis.cancel();
   };


   return (
       <div className="flex flex-col bg-gray-100 items-center p-6 pt-24 min-h-screen">
           <div className="p-8">
               <h1 className="text-6xl font-bold mb-3 text-gray-800"
                onMouseEnter={() => handleMouseEnter(utterance_flashcards)}
                onMouseLeave={handleMouseLeave}
               >
                   Flashcard Sets
               </h1>
           </div>
               <h2 className="text-4xl font-bold mb-6 text-gray-800"
                onMouseEnter={() => handleMouseEnter(utterance_pick)}
                onMouseLeave={handleMouseLeave}
               >
                   Pick a set of flashcards to begin:
               </h2>
               <div className="flex flex-row p-10 gap-35 justify-center items-center">
                   <div className="flex bg-yellow-600 rounded-xl text-white p-20 shadow-2xl cursor-pointer justify-center pl-35 pr-35"
                    onMouseEnter={() => handleMouseEnter(utterance_alphabet)}
                    onMouseLeave={handleMouseLeave}
                   >
                       <a href="/voicebridge/alphabet" className="font-bold text-5xl">Alphabet</a>
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

export default Flashcards;