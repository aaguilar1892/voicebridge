import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const Alphabet = () => {

    const [isWebcamOn, setIsWebcamOn] = useState(true);
    const [isCapture, setIsCapture] = useState(false); // whether or not camera is capturing for the cards
    const [letter, setLetter] = useState('');
    const isCaptureRef = useRef(isCapture)


    const handlePractice = () => {
        
        setIsCapture(!isCapture);
        isCaptureRef.current = isCapture;
        if (!isCapture) {
            handleFlashcard();
        } 
    };


    const handleFlashcard = async () => {
        console.log('flashcard called')
        // Shuffle flashcards
        let letters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
        for (let i = letters.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [letters[i], letters[j]] = [letters[j], letters[i]]; // Swap elements
        }
        
        let i = 0;
        setLetter(letters[i])
        console.log(letters[i])
        while(!isCaptureRef.current && i < letters.length) {

            const response = await axios.get('http://localhost:5001/predict_letter');
            const prediction = response.data.letter;
            console.log(prediction);
            

            if (prediction === letters[i]) {
                i++;
                setLetter(letters[i])
            }
        }
          
    };


    const handleMouseEnter = (utterance) => {
        speechSynthesis.speak(utterance);
    };
 
 
    const handleMouseLeave = () => {
        speechSynthesis.cancel();
    };

    return (
        <div className="flex flex-col items-center bg-gray-100 p-6 pt-24 min-h-screen">
            <h1 className="text-4xl font-bold mb-6 text-gray-800">Alphabet Flash Cards</h1>

            <div
            className="self-center mt-2 px-4 py-2 text-gray-800 font-bold rounded-full text-2xl"
            >   
            {`Current Letter: ${letter}`}
            </div>

            <div
            className={`relative flex-[4] ml-4 md:ml-8 min-h-[320px] bg-white rounded-xl shadow-lg overflow-hidden aspect-video transition-all`}
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
            </div>

            <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-4">
                <button
                onClick={handlePractice}
                className={'px-6 py-2 rounded-full text-lg font-semibold transition bg-white border border-blue-700 text-blue-700'}
                >
                    {isCapture ? "End Practice" : "Practice"} 
                </button>
            </div>

            
        </div>
    );
};
 
 export default Alphabet;