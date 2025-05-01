import React from 'react';
import { FaUser } from "react-icons/fa";
import { useState } from 'react';
import { auth } from './firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

let utterance_signup = new SpeechSynthesisUtterance("Sign up");
let utterance_email = new SpeechSynthesisUtterance("Email");
let utterance_password = new SpeechSynthesisUtterance("Password");
let utterance_enter_email = new SpeechSynthesisUtterance("Enter email");
let utterance_enter_password = new SpeechSynthesisUtterance("Enter password");
let utterance_submit = new SpeechSynthesisUtterance("Submit");
let utterance_registered = new SpeechSynthesisUtterance("Already have an account? Click here");

const Signup = () => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

   const handleMouseEnter = (utterance) => {
       speechSynthesis.speak(utterance);
   };

   const handleMouseLeave = () => {
       speechSynthesis.cancel();
   };

   const handleSubmit = async (e) => {
       e.preventDefault();
       try {
           await createUserWithEmailAndPassword(auth, email, password);
           console.log("Account created.");
       } catch(err) {
           console.log(err);
       }
   };

   return (
       <div className="flex justify-center items-center h-screen">
           <div className="w-150 h-98 p-6 shadow-2xl bg-white rounded-xl border-4 border-gray-500 shadow-yellow-600">
               <form onSubmit={handleSubmit}>
               <h1 className="text-3xl block text-center font-bold"
                onMouseEnter={() => handleMouseEnter(utterance_signup)}
                onMouseLeave={handleMouseLeave}
               >
                   <span className="flex justify-center gap-2">
                       <FaUser />
                       Sign up
                   </span>
               </h1>
               <hr className="mt-3"></hr>
               <div className="mt-3">
                   <label htmlFor="email" className="block text-base mb-2 font-semibold"
                    onMouseEnter={() => handleMouseEnter(utterance_email)}
                    onMouseLeave={handleMouseLeave}
                   >
                       Email
                   </label>
                   <input 
                       type="email" 
                       id="email" 
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}
                       className="border w-full text-base px-2 py-2 focus:outline-none focus:ring-0 focus:border-gray-600 rounded shadow-xl" 
                       placeholder="Enter Email"
                       onMouseEnter={() => handleMouseEnter(utterance_enter_email)}
                       onMouseLeave={handleMouseLeave}
                   />
               </div>
               <div className="mt-3">
                   <label htmlFor="password" className="block text-base mb-2 font-semibold"
                    onMouseEnter={() => handleMouseEnter(utterance_password)}
                    onMouseLeave={handleMouseLeave}
                   >
                       Password
                   </label>
                   <input 
                       type="password" 
                       id="password" 
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                       className="border w-full text-base px-2 py-2 focus:outline-none focus:ring-0 focus:border-gray-600 rounded shadow-xl" 
                       placeholder="Enter Password"
                       onMouseEnter={() => handleMouseEnter(utterance_enter_password)}
                       onMouseLeave={handleMouseLeave}
                   />
               </div>
               <div className="mt-8 font-bold flex flex-col gap-5">
                      <button type="submit" className="border-2 border-yellow-600 bg-yellow-600 shadow-xl rounded-sm text-white py-3 w-full cursor-pointer"
                       onMouseEnter={() => handleMouseEnter(utterance_submit)}
                       onMouseLeave={handleMouseLeave}
                      >
                          Submit
                      </button>
                  </div>
                  <div className="mt-3">
                      <a href="/voicebridge/Login" className="text-yellow-600"
                          onMouseEnter={() => handleMouseEnter(utterance_registered)}
                          onMouseLeave={handleMouseLeave}
                      >
                              Already have an account? Click here
                      </a>
                  </div>
               </form>
           </div>
       </div>
   );
};

export default Signup;