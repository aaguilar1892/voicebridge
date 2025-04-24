import React, { useState } from 'react';
import { Link } from 'react-scroll';
import { motion } from 'framer-motion';
import aboutImgOne from '/img/about-img-1.jpg';
import aboutImgTwo from '/img/hands_annotated.jpg';
import { useTTS } from '../context/useTTS';

let utterance_about1h = new SpeechSynthesisUtterance("Learn How to Start Signing!");
let utterance_about1 = new SpeechSynthesisUtterance("VoiceBridge is an All-Inclusive web application that assists blind and visually impaired individuals in learning American Sign Language (ASL). We aim to make a big step in the journey to make ASL Inclusive for BVI users.");
let utterance_about2h = new SpeechSynthesisUtterance("How our Website Works");
let utterance_about2 = new SpeechSynthesisUtterance("VoiceBridge utilizes the webcam and tracks the user's hand movements to translate ASL in real time, creating a conversation that the sign speaker can hear and practice to improve their ASL skills.");

const About = () => {
  const [isHovered, setIsHovered] = useState(false);
  const { ttsEnabled } = useTTS(); 

  const handleMouseEnter = (utterance) => {
    setIsHovered(true);
    if (ttsEnabled) speechSynthesis.speak(utterance);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (ttsEnabled) speechSynthesis.cancel();
  };

  return (
    <section id="about-section" className="bg-gray-100 py-20">
      {/* First About Section */}
      <motion.section
        id="first-about"
        className="my-20"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container border-4 bg-gray-50 border-gray-500 shadow-yellow-600 shadow-2xl mx-auto py-20 px-6 sm:px-8 lg:px-10 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
            <div className="max-w-lg">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl"
                onMouseEnter={() => handleMouseEnter(utterance_about1h)}
                onMouseLeave={handleMouseLeave}
              >
                Learn How to Start Signing!
              </h2>
              <p className="mt-4 text-gray-700 text-xl"
                onMouseEnter={() => handleMouseEnter(utterance_about1)}
                onMouseLeave={handleMouseLeave}
              >
                VoiceBridge is an <span className="font-bold">All-Inclusive</span> web application that assists blind and visually impaired
                individuals in learning American Sign Language (ASL). We aim to make a big step in the journey to make ASL Inclusive for BVI
                users.
              </p>
            </div>
            <div className="mt-8 md:mt-0">
              <img
                src={aboutImgOne}
                alt="About Us Image One"
                className="border-2 border-gray-600 rounded-lg shadow-md w-[400px] h-[300px] mx-auto"
              />
            </div>
          </div>
        </div>
      </motion.section>

      {/* Second About Section */}
      <motion.section
        id="second-about"
        className="my-20"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <div className="container border-4 bg-gray-50 border-gray-500 shadow-yellow-600 shadow-2xl mx-auto py-20 px-6 sm:px-8 lg:px-10 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:flex-row-reverse">
            <div className="mt-8 md:mt-0">
              <img
                src={aboutImgTwo}
                alt="About Us Image Two"
                className="border-2 border-gray-600 object-cover rounded-lg shadow-md w-96 h-72 mx-auto"
              />
            </div>
            <div className="max-w-md">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl"
                onMouseEnter={() => handleMouseEnter(utterance_about2h)}
                onMouseLeave={handleMouseLeave}
              >
                How our Website Works
              </h2>
              <p className="mt-4 text-gray-700 text-xl"
                onMouseEnter={() => handleMouseEnter(utterance_about2)}
                onMouseLeave={handleMouseLeave}
              >
                VoiceBridge utilizes the webcam and tracks the user's hand movements to translate ASL in real time, creating a conversation that
                the sign speaker can hear and practice to improve their ASL skills.
              </p>
            </div>
          </div>
        </div>
      </motion.section>
    </section>
  );
};

export default About;
