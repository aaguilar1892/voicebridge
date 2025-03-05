import React from 'react';
import Speech from 'react-speech';
import { useState } from 'react';
import { Link } from "react-scroll";
import { GiArchBridge } from "react-icons/gi";
import { Bars3BottomRightIcon, XMarkIcon } from '@heroicons/react/24/solid';

let utterance_about_btn = new SpeechSynthesisUtterance("About");
let utterance_get_started = new SpeechSynthesisUtterance("Get Started");
let utterance_practice_btn = new SpeechSynthesisUtterance("Practice");
let utterance_translate_btn = new SpeechSynthesisUtterance("Translate");
let utterance_logo = new SpeechSynthesisUtterance("Voice Bridge");
let utterance_h = new SpeechSynthesisUtterance("About, Translate, Practice");

const Header = () => {

    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = (utterance) => {
      setIsHovered(true);
      speechSynthesis.speak(utterance);
    };
  
    const handleMouseLeave = () => {
      setIsHovered(false);
      speechSynthesis.cancel();
    };

    /* Navigation Links */
    const Links = [
        { name: 'About', to: 'about-section' },
        { name: 'Translate', to: 'translate' },
        { name: 'Practice', to: 'practice' },
    ];

    /* Mobile Menu State */
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="shadow-md w-full fixed top-0 left-0 bg-white z-50">
            <div className="md:px-10 py-4 px-7 md:flex justify-between items-center">
                
                {/* Logo - Links to Home Section */}
                <Link 
                    to="home" 
                    smooth={true} 
                    duration={500} 
                    className="flex text-2xl cursor-pointer items-center gap-2"
                >
                    <GiArchBridge className="w-7 h-7 text-yellow-600" />
                    <span className="font-bold"
                     onMouseEnter={() => handleMouseEnter(utterance_logo)}
                     onMouseLeave={handleMouseLeave}
                    >
                     VoiceBridge
                    </span>
                </Link>

                {/* Mobile Menu Icon */}
                <div onClick={() => setIsOpen(!isOpen)} className="w-7 h-7 absolute right-8 top-6 cursor-pointer md:hidden">
                    {isOpen ? <XMarkIcon /> : <Bars3BottomRightIcon />}
                </div>

                {/* Navigation Links */}
                <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white w-full md:w-auto left-0 transition-all duration-500 ease-in 
                ${isOpen ? 'top-12' : 'top-[-490px]'}`}>
                    {Links.map((link) => (
                        <li key={link.name} className="font-semibold text-lg md:text-xl my-7 md:my-0 md:ml-8">
                            <Link 
                                to={link.to}
                                link_name={link.name} 
                                smooth={true} 
                                duration={500} 
                                className="cursor-pointer hover:text-yellow-600"
                                onClick={() => setIsOpen(false)}
                                onMouseEnter={() => handleMouseEnter(utterance_h)}
                                onMouseLeave={handleMouseLeave}
                            >
                                {link.name}
                            </Link>
                        </li>
                    ))}
                    <Link 
                        to="translate" 
                        smooth={true} 
                        duration={500} 
                        className="btn bg-yellow-600 text-white py-1 px-3 md:ml-8 rounded text-lg md:text-xl font-bold cursor-pointer hover:bg-yellow-700"
                        onClick={() => setIsOpen(false)}
                        onMouseEnter={() => handleMouseEnter(utterance_get_started)}
                        onMouseLeave={handleMouseLeave}
                    >
                        Get Started
                    </Link>
                </ul>
            </div>
        </div>
    );
};

export default Header;
