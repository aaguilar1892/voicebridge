import React, { useState, useEffect } from 'react';

let utterance_translate = new SpeechSynthesisUtterance("Translate");
let utterance_webcam_off = new SpeechSynthesisUtterance("Turn Off Webcam");
let utterance_webcam_on = new SpeechSynthesisUtterance("Turn On Webcam");
let utterance_enter_text = new SpeechSynthesisUtterance("Enter text here");

const Translate = () => {
    const [text, setText] = useState('');
    const [isWebcamOn, setIsWebcamOn] = useState(true);
    const [isHovered, setIsHovered] = useState(false);

    const handleTextChange = (event) => {
        setText(event.target.value);
    };

    const toggleWebcam = () => {
        setIsWebcamOn(!isWebcamOn);
    };

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
                {/* Webcam Feed - Larger & Rectangular */}
                <div className="relative bg-white rounded-xl shadow-lg overflow-hidden">
                    {isWebcamOn ? (
                        <img
                            src="http://localhost:5001/video_feed"  // Use the updated port here
                            alt="Webcam Feed"
                            className="w-full h-[400px] object-cover rounded-xl"
                        />
                    ) : (
                        <div className="w-full h-[400px] flex items-center justify-center bg-gray-300 rounded-xl">
                            <span className="text-gray-600 text-lg">Webcam Off</span>
                        </div>
                    )}
                </div>

                {/* Toggle Button */}
                <button
                    onClick={toggleWebcam}
                    className="px-6 py-3 bg-yellow-600 text-white text-lg font-semibold rounded-lg hover:bg-yellow-700 transition"
                    onMouseEnter={() => handleMouseEnterWebcam()}
                    onMouseLeave={handleMouseLeave}
                >
                    {isWebcamOn ? "Turn Off Webcam" : "Turn On Webcam"}
                </button>

                {/* Textbox - Larger, Scrollable & Rectangular */}
                <textarea
                    value={text}
                    onChange={handleTextChange}
                    className="w-full p-4 border border-gray-400 rounded-xl text-lg focus:ring-2 focus:ring-yellow-600 resize-none overflow-y-auto"
                    rows="6"
                    placeholder="Enter text here..."
                />
            </div>

            {/* Extra margin to allow scrolling */}
            <div className="h-20"></div>
        </div>
    );
};

export default Translate;
