import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const Exercises = () => {

    const [isWebcamOn, setIsWebcamOn] = useState(true);
    const letters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    const [letter, setLetter] = useState(letters[0]);
    const [prediction, setPrediction] = useState('Nothing')
    const loadingRef = useRef(false);
    const [capture, setCapture] = useState(false);
    const initialRender = useRef(false)

    useEffect(() => {
        if (initialRender.current) {
            return;
        }

        if (prediction === letter) {
                loadingRef.current = true;
                console.log("correct Prediction")
                let nextLetter = letters[Math.floor(Math.random() * 26)];
                setLetter(nextLetter);

                const utterance = new SpeechSynthesisUtterance(`Good Job, Next Letter ${nextLetter}`);
                utterance.lang = 'en-US';
                speechSynthesis.speak(utterance);
        } else {
            
        }

    },[prediction]);


    const handleClick = async () => {
        setCapture(true);

        if (letter == 'A') {
            const utterance = new SpeechSynthesisUtterance(letter);
            utterance.lang = 'en-US';
            speechSynthesis.speak(utterance);
        }

        for (let i = 0; i < 10; i++) {
            await fetchLetter();
            await setTimeout(() => console.log('delaying...'), 1000);

            if (loadingRef.current) {
                break;
            }

        }
        setCapture(false);
        loadingRef.current = false;
    };
    

    const fetchLetter = async () => {
        try {
            const response = await axios.get('http://localhost:5001/predict_letter');
            const pred = response.data.letter;
            setPrediction(pred);
        } catch (err) {
            console.error('API error:', err);
            return "Nothing"
        }        
    };

    const handlePass = () => {
        let nextLetter = letters[Math.floor(Math.random() * 26)];
        const utterance = new SpeechSynthesisUtterance(nextLetter);
        utterance.lang = 'en-US';
        speechSynthesis.speak(utterance);
        setLetter(nextLetter);
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
          if (event.code === 'Enter' && !capture) {
            handleClick();
          } else if (event.code === 'Space' && !capture) {
            handlePass();
          } else if (event.code === 'KeyR') {
            const utterance = new SpeechSynthesisUtterance(letter);
            utterance.lang = 'en-US';
            speechSynthesis.speak(utterance);
          }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
      }), [];


    return (
        <div className="flex flex-col items-center bg-gray-100 p-6 pt-24 min-h-screen">
            <h1 className="text-4xl font-bold mb-6 text-gray-800">Test your knowledge!</h1>

            <div
            className="self-center mt-2 px-4 py-2 text-gray-800 font-bold rounded-full text-2xl"
            >   
            {`Current Letter (R): ${letter} `}
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
                {/* Start practice button */ }
                <button
                onClick={handleClick}
                className={'px-20 py-4 rounded-full text-lg font-semibold transition bg-white border border-blue-700 text-blue-700'}
                >
                    {capture ? "Capturing..." : "Attempt (Enter)"} 
                </button>

                <button
                onClick={handlePass}
                className={'px-20 py-4 rounded-full text-lg font-semibold transition bg-white border border-blue-700 text-blue-700'}
                >
                    Pass (Space)
                </button>
                
            </div>

            
        </div>
    );
};
 
 export default Exercises;