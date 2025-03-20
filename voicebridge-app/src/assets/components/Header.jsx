import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { GiArchBridge } from "react-icons/gi";
import { Bars3BottomRightIcon, XMarkIcon } from '@heroicons/react/24/solid';

/* Speech Synthesis */
let utterance_about_btn = new SpeechSynthesisUtterance("About");
let utterance_get_started = new SpeechSynthesisUtterance("Get Started");
let utterance_practice_btn = new SpeechSynthesisUtterance("Practice");
let utterance_translate_btn = new SpeechSynthesisUtterance("Translate");
let utterance_logo = new SpeechSynthesisUtterance("Voice Bridge");

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();  // Get current route

    const handleMouseEnter = (utterance) => {
        speechSynthesis.speak(utterance);
    };

    const handleMouseLeave = () => {
        speechSynthesis.cancel();
    };

    // Handle navigation for About button
    const handleAboutClick = () => {
        setIsOpen(false);
        if (location.pathname !== "/voicebridge") {
            window.location.href = "/voicebridge"; // Redirect to home and scroll
        } else {
            document.getElementById("about-section")?.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="shadow-md w-full fixed top-0 left-0 bg-white z-50">
            <div className="md:px-10 py-4 px-7 md:flex justify-between items-center">
                
                {/* Logo - Links to Home Page */}
                <NavLink 
                    to="/voicebridge" 
                    className="flex text-2xl cursor-pointer items-center gap-2"
                    onMouseEnter={() => handleMouseEnter(utterance_logo)}
                    onMouseLeave={handleMouseLeave}
                >
                    <GiArchBridge className="w-7 h-7 text-yellow-600" />
                    <span className="font-bold">VoiceBridge</span>
                </NavLink>

                {/* Mobile Menu Icon */}
                <div onClick={() => setIsOpen(!isOpen)} className="w-7 h-7 absolute right-8 top-6 cursor-pointer md:hidden">
                    {isOpen ? <XMarkIcon /> : <Bars3BottomRightIcon />}
                </div>

                {/* Navigation Links */}
                <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white w-full md:w-auto left-0 transition-all duration-500 ease-in 
                ${isOpen ? 'top-12' : 'top-[-490px]'}`}>
                    
                    {/* About Link - Scrolls or Redirects */}
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
                    
                    {/* Translate Link */}
                    <li className="font-semibold text-lg md:text-xl my-7 md:my-0 md:ml-8">
                        <NavLink 
                            to="/translate"
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

                    {/* Practice Link */}
                    <li className="font-semibold text-lg md:text-xl my-7 md:my-0 md:ml-8">
                        <NavLink 
                            to="/practice"
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

                    {/* Get Started Button */}
                    <NavLink 
                        to="/translate" 
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
