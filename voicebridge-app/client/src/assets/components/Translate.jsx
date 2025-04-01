import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
import axios from 'axios';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
=======

let utterance_translate = new SpeechSynthesisUtterance("Translate");
let utterance_webcam_off = new SpeechSynthesisUtterance("Turn Off Webcam");
let utterance_webcam_on = new SpeechSynthesisUtterance("Turn On Webcam");
let utterance_enter_text = new SpeechSynthesisUtterance("Enter text here");
>>>>>>> main

const Translate = () => {
    const [text, setText] = useState('');
    const [isWebcamOn, setIsWebcamOn] = useState(true);
<<<<<<< HEAD
    const [letterDetected, setLetterDetected] = useState(false);
    const [loading, setLoading] = useState(false);
    const [buttonClicked, setButtonClicked] = useState(false);
=======
    const [isHovered, setIsHovered] = useState(false);
>>>>>>> main

    const fetchPrediction = async () => {
        if (loading) return; // Prevent multiple clicks during loading
        setLoading(true);
        setButtonClicked(true);  // Mark the button as clicked

        try {
            const response = await axios.get('http://localhost:5001/predict_letter');
            const letter = response.data.letter;
            if (letter !== "nothing") {
                setText(prevText => prevText + letter);
                setLetterDetected(true);  // Set to true when letter is detected
            } else {
                setLetterDetected(false);  // Set to false if no letter is detected
            }
        } catch (error) {
            console.error("Error fetching prediction:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.code === 'Space' && !loading) {  // Prevent triggering if loading
                fetchPrediction();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [loading]);  // Re-run only when loading state changes

    // Reset buttonClicked and letterDetected state after some delay
    useEffect(() => {
        if (!loading) {
            const resetState = setTimeout(() => {
                setButtonClicked(false);  // Reset after a small delay
                setLetterDetected(false);  // Reset letterDetected after delay to avoid constant green border
            }, 500);
            return () => clearTimeout(resetState);
        }
    }, [loading]);  // Reset state only when loading is false

    const handleMouseEnter = (utterance) => {
        setIsHovered(true);
        speechSynthesis.speak(utterance);
    };
    
    const handleMouseLeave = () => {
        setIsHovered(false);
        speechSynthesis.cancel();
    };

    const handleMouseEnterWebcam = () => {
        setIsHovered(true);
        isWebcamOn ? speechSynthesis.speak(utterance_webcam_off) : speechSynthesis.speak(utterance_webcam_on);
    }

    return (
        <div className="flex flex-col items-center bg-gray-100 p-6 pt-24 min-h-screen">
            <h1 className="text-4xl font-bold mb-6 text-gray-800"
                onMouseEnter={() => handleMouseEnter(utterance_translate)}
                onMouseLeave={handleMouseLeave}
            >
                Translate
            </h1>

            <div className="w-full max-w-3xl flex flex-col gap-6">
                {/* Webcam Feed */}
                <div 
                    className={`relative bg-white rounded-xl shadow-lg overflow-hidden transition-all ${
                        letterDetected ? "border-4 border-green-500" : 
                        (buttonClicked && !letterDetected ? "border-4 border-red-500" : "border-4 border-gray-300")
                    }`}
                >
                    {isWebcamOn ? (
                        <img
<<<<<<< HEAD
                            src="http://localhost:5001/video_feed"
=======
                            src="http://localhost:5001/video_feed"  // Use the updated port here
>>>>>>> main
                            alt="Webcam Feed"
                            className="w-full h-[400px] object-cover rounded-xl"
                        />
                    ) : (
                        <div className="w-full h-[400px] flex items-center justify-center bg-gray-300 rounded-xl">
                            <span className="text-gray-600 text-lg">Webcam Off</span>
                        </div>
                    )}

                    {/* Checkmark Indicator for detected letter */}
                    {letterDetected && (
                        <div className="absolute top-4 right-4 bg-green-500 rounded-full p-2 shadow-lg animate-ping">
                            <CheckCircleIcon className="w-8 h-8 text-white" />
                        </div>
                    )}

                    {/* Red X Indicator if nothing detected */}
                    {buttonClicked && !letterDetected && (
                        <div className="absolute top-4 right-4 bg-red-500 rounded-full p-2 shadow-lg animate-ping">
                            <XCircleIcon className="w-8 h-8 text-white" />
                        </div>
                    )}
                </div>

<<<<<<< HEAD
                {/* Capture Button */}
                <button
                    onClick={fetchPrediction}
                    disabled={loading}
                    className={`px-6 py-3 ${
                        loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
                    } text-white text-lg font-semibold rounded-lg transition`}
                >
                    {loading ? "Capturing..." : "Capture Letter"}
                </button>

                {/* Toggle Webcam */}
                <button
                    onClick={() => setIsWebcamOn(!isWebcamOn)}
=======
                {/* Toggle Button */}
                <button
                    onClick={toggleWebcam}
>>>>>>> main
                    className="px-6 py-3 bg-yellow-600 text-white text-lg font-semibold rounded-lg hover:bg-yellow-700 transition"
                    onMouseEnter={() => handleMouseEnterWebcam()}
                    onMouseLeave={handleMouseLeave}
                >
                    {isWebcamOn ? "Turn Off Webcam" : "Turn On Webcam"}
                </button>

                {/* Textbox */}
                <textarea
                    value={text}
                    className="w-full p-4 border border-gray-400 rounded-xl text-lg focus:ring-2 focus:ring-yellow-600 resize-none overflow-y-auto"
                    rows="6"
                    placeholder="Captured letters will appear here..."
                    readOnly
                />
            </div>

            {/* Extra margin for spacing */}
            <div className="h-20"></div>
        </div>
    );
};

export default Translate;
