import React, { useState } from 'react';
import { Link } from "react-scroll";
import { motion } from 'framer-motion';
import heroImg from '/src/assets/svg/hero.svg';
import { useTTS } from '../context/useTTS'; // Use relative path if not working

let utterance_welcome = new SpeechSynthesisUtterance("Welcome to Voice Bridge!");
let utterance_subtitle = new SpeechSynthesisUtterance("Your Personal ASL Interpreter and Translator! Friendly and Interactive for BVI users.");
let utterance_start = new SpeechSynthesisUtterance("Get Started");
let utterance_login = new SpeechSynthesisUtterance("Log in");

const Hero = () => {
  const [isHovered, setIsHovered] = useState(false);
  const { ttsEnabled } = useTTS(); // Enable TTS toggle

  const handleMouseEnter = (utterance) => {
    setIsHovered(true);
    if (ttsEnabled) speechSynthesis.speak(utterance);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (ttsEnabled) speechSynthesis.cancel();
  };

  return (
    <section id="home" className="min-h-screen bg-gray-100 text-black flex items-center">
      <div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
        
        <div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
          <motion.h1
            className="text-5xl font-bold leading-none sm:text-6xl"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            onMouseEnter={() => handleMouseEnter(utterance_welcome)}
            onMouseLeave={handleMouseLeave}
          >
            Welcome to <span className="text-yellow-600">VoiceBridge</span>!
          </motion.h1>

          <motion.p
            className="mt-6 mb-8 text-xl sm:mb-12 font-bold"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            onMouseEnter={() => handleMouseEnter(utterance_subtitle)}
            onMouseLeave={handleMouseLeave}
          >
            Your Personal ASL Interpreter and Translator! 
            <br className="hidden md:inline lg:hidden" /> Friendly and Interactive for BVI users.
          </motion.p>

          <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
            <Link 
              to="translate" 
              smooth={true} 
              duration={500}
              className="px-8 py-3 text-lg font-semibold rounded bg-yellow-600 hover:bg-yellow-700 text-white cursor-pointer"
              onMouseEnter={() => handleMouseEnter(utterance_start)}
              onMouseLeave={handleMouseLeave}
            >
              Get Started
            </Link>
            <a 
              href="/voicebridge/Login"
              className="px-8 py-3 text-lg font-semibold border rounded border-black hover:bg-gray-300"
              onMouseEnter={() => handleMouseEnter(utterance_login)}
              onMouseLeave={handleMouseLeave}
            >
              Log in
            </a>
          </div>
        </div>

        <div className="flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
          <motion.img
            src={heroImg}
            alt="Hero"
            className="object-contain border-3 rounded-2xl h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
