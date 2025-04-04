import React, { useState, useEffect, useRef } from 'react';
import micImg from '/src/assets/svg/microphone.svg';  


const Speech = () => {

    /* Speech to text */
    const [transcript, setTranscript] = useState("");
    const [isListening, setIsListening] = useState(false);
    const recognitionRef = useRef(null);
	

    useEffect(() => {
        if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
			const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

            const recognition = new SpeechRecognition;
            recognition.continuous = true;
            recognition.interimResults = true;
            recognition.lang = "en-US";

            recognition.onresult = (event) => {
              let interimTranscript = "";
              let finalTranscript = "";

              for (let i = 0; i < event.results.length; i++) {
                  const transcriptChunk = event.results[i][0].transcript;
                  if (event.results[i].isFinal) {
                      finalTranscript += transcriptChunk + " ";
                  } else {
                      interimTranscript += transcriptChunk;
                  }
              }

              setTranscript(finalTranscript || interimTranscript);
            };

            recognition.onend = () => {
                setIsListening(false);
            };

			recognitionRef.current = recognition;

        } else {
            setTranscript('Voice not available on this browser');
        }

    }, []);

    const toggleListening = () => {
        
        if (!isListening) {
			const recognition = recognitionRef.current;
            recognition.start();
        } else {
			const recognition = recognitionRef.current;
            recognition.stop();
        }

        setIsListening(!isListening);
    };

    return (
        <div className="flex flex-col items-center bg-gray-100 p-6 pt-24 min-h-screen">
            <h1 className="text-4xl font-bold mb-6 text-gray-800">Speech</h1>
            
            <div className="w-full max-w-3xl flex flex-col gap-6">
                
                <img
                  src={micImg} 
                  alt={"Microphone Image"} 
                  height={200} 
                  width={200} 
                  style={{ alignSelf: 'center' }}
                ></img>

                <button
                    onClick={toggleListening}
                    className="px-6 py-3 bg-yellow-600 text-white text-lg font-semibold rounded-lg hover:bg-yellow-700 transition"
                >
                    {isListening ? "Stop Listening" : "Start Listening"}
                </button>
                
                {/* Textbox for voice - Larger, Scrollable & Rectangular */}
                <textarea
                    value={transcript || "Speak now..."}
                    className="w-full p-4 border border-gray-400 rounded-xl text-lg focus:ring-2 focus:ring-yellow-600 resize-none overflow-y-auto"
                    rows="6"
                />

            </div>

            
            

            {/* Extra margin to allow scrolling */}
            <div className="h-20"></div>
        </div>
    );
};

export default Speech;
