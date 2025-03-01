import { useState } from 'react';
import { Link } from 'react-scroll';
import { motion } from 'framer-motion';
import aboutImgOne from '/img/about-img-1.jpg';
import aboutImgTwo from '/img/hands_annotated.jpg';

const About = () => {
  return (
    <section id="about-section" className="bg-gray-100 py-20">
      {/* First About Section */}
      <motion.section
        id="first-about"
        className="my-20"
        initial={{ opacity: 0, y: 50 }} // Starts with low opacity and slightly moved down
        whileInView={{ opacity: 1, y: 0 }} // Fades in and moves to normal position when in view
        transition={{ duration: 0.8 }} // Animation duration
        viewport={{ once: true }} // Trigger once when section enters the viewport
      >
        <div className="container border-4 bg-gray-50 border-gray-500 shadow-yellow-600 shadow-2xl mx-auto py-20 px-6 sm:px-8 lg:px-10 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
            <div className="max-w-lg">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Learn How to Start Signing!</h2>
              <p className="mt-4 text-gray-700 text-xl">
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
        initial={{ opacity: 0, y: 50 }} // Starts with low opacity and slightly moved down
        whileInView={{ opacity: 1, y: 0 }} // Fades in and moves to normal position when in view
        transition={{ duration: 0.8, delay: 0.2 }} // Slight delay for the second section
        viewport={{ once: true }} // Trigger once when section enters the viewport
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
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">How our Website Works</h2>
              <p className="mt-4 text-gray-700 text-xl">
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
