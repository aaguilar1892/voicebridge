import React from 'react';
import { FaUser } from "react-icons/fa";
import { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from './firebase';


let utterance_login = new SpeechSynthesisUtterance("Log in");
let utterance_signup = new SpeechSynthesisUtterance("Sign up");
let utterance_remember_me = new SpeechSynthesisUtterance("Remember me");
let utterance_forgot_password = new SpeechSynthesisUtterance("Forgot password?");
let utterance_username = new SpeechSynthesisUtterance("Username");
let utterance_password = new SpeechSynthesisUtterance("Password");
let utterance_enter_username = new SpeechSynthesisUtterance("Enter username");
let utterance_enter_password = new SpeechSynthesisUtterance("Enter password");


const Login = () => {

   const [isHovered, setIsHovered] = useState(false);
   const [username, setUsername] = useState('');
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
           await signInWithEmailAndPassword(auth, username, password);
           console.log("Login successful.");
       } catch(err) {
           console.log(err);
       }
   };

   return (
       <div className="flex justify-center items-center h-screen">
           <div className="w-150 h-102 p-6 shadow-2xl bg-white rounded-xl border-4 border-gray-500 shadow-yellow-600">
               <form onSubmit={handleSubmit}>
                   <h1 className="text-3xl block text-center font-bold"
                   onMouseEnter={() => handleMouseEnter(utterance_login)}
                   onMouseLeave={handleMouseLeave}
                   >
                       <span className="flex justify-center gap-2">
                           <FaUser />
                           Login
                       </span>
                   </h1>
                   <hr className="mt-3"></hr>
                   <div className="mt-3">
                       <label htmlFor="username" className="block text-base mb-2 font-semibold"
                       onMouseEnter={() => handleMouseEnter(utterance_username)}
                       onMouseLeave={handleMouseLeave}
                       >
                           Username
                       </label>
                       <input type="text" id="username" className="border w-full text-base px-2 py-2 focus:outline-none focus:ring-0 focus:border-gray-600 rounded shadow-xl" placeholder="Enter Username"
                       onChange={e => setUsername(e.target.value)}
                       onMouseEnter={() => handleMouseEnter(utterance_enter_username)}
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
                       <input type="password" id="password" className="border w-full text-base px-2 py-2 focus:outline-none focus:ring-0 focus:border-gray-600 rounded shadow-xl" placeholder="Enter Password"
                       onChange={(e) => setPassword(e.target.value)}
                       onMouseEnter={() => handleMouseEnter(utterance_enter_password)}
                       onMouseLeave={handleMouseLeave}
                       />
                   </div>
                   {/*}
                   <div className="mt-3 flex justify-between items-center font-semibold">
                       <div>
                           <span className="flex gap-1">
                               <input type="checkbox"></input>
                               <label
                               onMouseEnter={() => handleMouseEnter(utterance_remember_me)}
                               onMouseLeave={handleMouseLeave}
                               >
                                   Remember Me
                               </label>
                           </span>
                       </div>
                       <div>
                           <a href="#" className="text-yellow-600"
                           onMouseEnter={() => handleMouseEnter(utterance_fogot_password)}
                           onMouseLeave={handleMouseLeave}
                           >
                               Forgot Password?
                           </a>
                       </div>
                   </div>
                   */}
                   <div className="mt-6 font-bold flex flex-col gap-5">
                       <button type="submit" className="border-2 border-gray-500 bg-gray-500 shadow-xl rounded-sm text-white py-2 w-full cursor-pointer"
                        onMouseEnter={() => handleMouseEnter(utterance_login)}
                        onMouseLeave={handleMouseLeave}
                       >
                           Login
                       </button>
                       <a href="/voicebridge/Signup" className="border-2 border-yellow-600 bg-yellow-600 shadow-xl rounded-sm text-white py-2 w-full cursor-pointer flex justify-center"
                        onMouseEnter={() => handleMouseEnter(utterance_signup)}
                        onMouseLeave={handleMouseLeave}
                       >
                           Sign up
                       </a>
                    </div>
               </form>
           </div>
       </div>
   );
};

export default Login;