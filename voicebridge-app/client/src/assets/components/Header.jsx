import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { GiArchBridge } from "react-icons/gi";
import { Bars3BottomRightIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { useTTS } from '../context/useTTS'; // TTS toggle context

let utterance_about_btn = new SpeechSynthesisUtterance("About");
let utterance_get_started = new SpeechSynthesisUtterance("Get Started");
let utterance_practice_btn = new SpeechSynthesisUtterance("Practice");
let utterance_translate_btn = new SpeechSynthesisUtterance("Translate");
let utterance_speech_btn = new SpeechSynthesisUtterance("Speech");
let utterance_logo = new SpeechSynthesisUtterance("Voice Bridge");

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { ttsEnabled, toggleTTS } = useTTS();

  const handleMouseEnter = (utterance) => {
    if (ttsEnabled) speechSynthesis.speak(utterance);
  };

  const handleMouseLeave = () => {
    if (ttsEnabled) speechSynthesis.cancel();
  };

  const handleAboutClick = () => {
    setIsOpen(false);
    if (location.pathname !== "/voicebridge") {
      window.location.href = "/voicebridge";
    } else {
      document.getElementById("about-section")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="shadow-md w-full fixed top-0 left-0 bg-white z-50">
      <div className="md:px-10 py-4 px-7 md:flex justify-between items-center">
        <div className="flex items-center justify-between w-full md:w-auto">
          <NavLink 
            to="/voicebridge"
            className="flex text-2xl cursor-pointer items-center gap-2"
            onMouseEnter={() => handleMouseEnter(utterance_logo)}
            onMouseLeave={handleMouseLeave}
          >
            <GiArchBridge className="w-7 h-7 text-yellow-600" />
            <span className="font-bold">VoiceBridge</span>
          </NavLink>

          <button
            onClick={toggleTTS}
            className="text-sm font-semibold ml-4 px-3 py-1 rounded border border-gray-400 hover:bg-gray-200"
          >
            {ttsEnabled ? "Disable TTS" : "Enable TTS"}
          </button>

          <div
            onClick={() => setIsOpen(!isOpen)}
            className="w-7 h-7 ml-auto cursor-pointer md:hidden"
          >
            {isOpen ? <XMarkIcon /> : <Bars3BottomRightIcon />}
          </div>
        </div>

        <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white w-full md:w-auto left-0 transition-all duration-500 ease-in 
          ${isOpen ? 'top-12' : 'top-[-490px]'}`}>
          <li className="font-semibold text-lg md:text-xl my-7 md:my-0 md:ml-8">
            <button
              className="cursor-pointer hover:text-yellow-600"
              onClick={handleAboutClick}
              onMouseEnter={() => handleMouseEnter(utterance_about_btn)}
              onMouseLeave={handleMouseLeave}
            >
              About
            </button>
          </li>

          <li className="font-semibold text-lg md:text-xl my-7 md:my-0 md:ml-8">
            <NavLink 
              to="/voicebridge/translate"
              className={({ isActive }) => 
                `cursor-pointer hover:text-yellow-600 ${isActive ? 'text-yellow-600 font-bold' : ''}`
              }
              onClick={() => setIsOpen(false)}
              onMouseEnter={() => handleMouseEnter(utterance_translate_btn)}
              onMouseLeave={handleMouseLeave}
            >
              Translate
            </NavLink>
          </li>

          <li className="font-semibold text-lg md:text-xl my-7 md:my-0 md:ml-8">
            <NavLink 
              to="/voicebridge/speech"
              className={({ isActive }) => 
                `cursor-pointer hover:text-yellow-600 ${isActive ? 'text-yellow-600 font-bold' : ''}`
              }
              onClick={() => setIsOpen(false)}
              onMouseEnter={() => handleMouseEnter(utterance_speech_btn)}
              onMouseLeave={handleMouseLeave}
            >
              Speech
            </NavLink>
          </li>

          <li className="font-semibold text-lg md:text-xl my-7 md:my-0 md:ml-8">
            <NavLink 
              to="/voicebridge/practice"
              className={({ isActive }) => 
                `cursor-pointer hover:text-yellow-600 ${isActive ? 'text-yellow-600 font-bold' : ''}`
              }
              onClick={() => setIsOpen(false)}
              onMouseEnter={() => handleMouseEnter(utterance_practice_btn)}
              onMouseLeave={handleMouseLeave}
            >
              Practice
            </NavLink>
          </li>

          <NavLink 
            to="/voicebridge/login"
            className="btn bg-yellow-600 text-white py-1 px-3 md:ml-8 rounded text-lg md:text-xl font-bold cursor-pointer hover:bg-yellow-700"
            onClick={() => setIsOpen(false)}
            onMouseEnter={() => handleMouseEnter(utterance_get_started)}
            onMouseLeave={handleMouseLeave}
          >
            Get Started
          </NavLink>
        </ul>
      </div>
    </div>
  );
};

export default Header;
