import React from 'react';
import { FaUser } from "react-icons/fa";
import { useState } from 'react';
<<<<<<< HEAD
import { auth } from './firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";
=======
>>>>>>> main

let utterance_signup = new SpeechSynthesisUtterance("Sign up");
let utterance_username = new SpeechSynthesisUtterance("Username");
let utterance_password = new SpeechSynthesisUtterance("Password");
let utterance_enter_username = new SpeechSynthesisUtterance("Enter username");
let utterance_enter_password = new SpeechSynthesisUtterance("Enter password");
let utterance_submit = new SpeechSynthesisUtterance("Submit");
<<<<<<< HEAD
=======
let utterance_registered = new SpeechSynthesisUtterance("Already have an account? Click here");
>>>>>>> main

const Signup = () => {

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
            await createUserWithEmailAndPassword(auth, username, password);
            console.log("Account created.");
        } catch(err) {
            console.log(err);
        }
<<<<<<< HEAD
    };

    return (
        <div class = "flex justify-center items-center h-screen bg-cyan-50">
            <div class = "w-150 h-92 p-6 shadow-2xl bg-white rounded-xl">
                <form onSubmit = { handleSubmit }>
                    <h1 class = "text-3xl block text-center font-bold"
                    onMouseEnter={() => handleMouseEnter(utterance_signup)}
                    onMouseLeave={handleMouseLeave}
                    >
                        <span class = "flex justify-center gap-2">
                            <FaUser />
                            Sign up
                        </span>
                    </h1>
                    <hr class = "mt-3"></hr>
                    <div class = "mt-3">
                        <label for = "username" class = "block text-base mb-2 font-semibold"
                        onMouseEnter={() => handleMouseEnter(utterance_username)}
                        onMouseLeave={handleMouseLeave}
                        >
                            Username
                        </label>
                        <input type = "text" id = "username" class = "border w-full text-base px-2 py-2 focus:outline-none focus:ring-0 focus:border-gray-600 rounded" placeholder = "Enter Username"
                        onChange = {e => setUsername((e).target.value)}
                        onMouseEnter={() => handleMouseEnter(utterance_enter_username)}
                        onMouseLeave={handleMouseLeave}
                        ></input>
                    </div>
                    <div class = "mt-3">
                        <label for = "password" class = "block text-base mb-2 font-semibold"
                        onMouseEnter={() => handleMouseEnter(utterance_password)}
                        onMouseLeave={handleMouseLeave}
                        >
                            Password
                        </label>
                        <input type = "password" id = "password" class = "border w-full text-base px-2 py-2 focus:outline-none focus:ring-0 focus:border-gray-600 rounded" placeholder = "Enter Password"
                        onChange = {(e) => setPassword(e.target.value)}
                        onMouseEnter={() => handleMouseEnter(utterance_enter_password)}
                        onMouseLeave={handleMouseLeave}
                        ></input>
                    </div>
                    <div class = "mt-8 font-bold flex flex-col gap-5">
                        <button type = "submit" class = "border-2 border-yellow-600 bg-yellow-600 shadow-xl rounded-sm text-white py-4 w-full cursor-pointer"
                         onMouseEnter={() => handleMouseEnter(utterance_submit)}
                         onMouseLeave={handleMouseLeave}
                        >
                            Submit
                        </button>
                    </div>
=======
    }; 

    return (
        <div class = "flex justify-center items-center h-screen">
            <div class = "w-150 h-98 p-6 shadow-2xl bg-white rounded-xl border-4 border-gray-500 shadow-yellow-600">
                <form onSubmit = { handleSubmit }>
                <h1 class = "text-3xl block text-center font-bold"
                 onMouseEnter={() => handleMouseEnter(utterance_login)}
                 onMouseLeave={handleMouseLeave}
                >
                    <span class = "flex justify-center gap-2">
                        <FaUser />
                        Sign up
                    </span>
                </h1>
                <hr class = "mt-3"></hr>
                <div class = "mt-3">
                    <label for = "username" class = "block text-base mb-2 font-semibold"
                     onMouseEnter={() => handleMouseEnter(utterance_username)}
                     onMouseLeave={handleMouseLeave}
                    >
                        Username
                    </label>
                    <input type = "text" id = "username" class = "border w-full text-base px-2 py-2 focus:outline-none focus:ring-0 focus:border-gray-600 rounded shadow-xl" placeholder = "Enter Username"
                     onMouseEnter={() => handleMouseEnter(utterance_enter_username)}
                     onMouseLeave={handleMouseLeave}
                    ></input>
                </div>
                <div class = "mt-3">
                    <label for = "password" class = "block text-base mb-2 font-semibold"
                     onMouseEnter={() => handleMouseEnter(utterance_password)}
                     onMouseLeave={handleMouseLeave}
                    >
                        Password
                    </label>
                    <input type = "text" id = "password" class = "border w-full text-base px-2 py-2 focus:outline-none focus:ring-0 focus:border-gray-600 rounded shadow-xl" placeholder = "Enter Password"
                     onMouseEnter={() => handleMouseEnter(utterance_enter_password)}
                     onMouseLeave={handleMouseLeave}
                    ></input>
                </div>
                <div class = "mt-8 font-bold flex flex-col gap-5">
                       <button type = "submit" class = "border-2 border-yellow-600 bg-yellow-600 shadow-xl rounded-sm text-white py-3 w-full cursor-pointer"
                        onMouseEnter={() => handleMouseEnter(utterance_submit)}
                        onMouseLeave={handleMouseLeave}
                       >
                           Submit
                       </button>
                   </div>
                   <div class = "mt-3">
                       <a href = "/voicebridge/Login" class = "text-yellow-600"
                           onMouseEnter={() => handleMouseEnter(utterance_registered)}
                           onMouseLeave={handleMouseLeave}
                       >
                               Already have an account? Click here
                       </a>
                   </div>
>>>>>>> main
                </form>
            </div>
        </div>
    );
};

export default Signup;