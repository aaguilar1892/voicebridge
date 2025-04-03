import React from 'react';
import { FaUser } from "react-icons/fa";
import { useState } from 'react';
import { auth } from './firebase';
import { signInWithEmailAndPassword } from "firebase/auth";

let utterance_login = new SpeechSynthesisUtterance("Log in");
let utterance_signup = new SpeechSynthesisUtterance("Sign up");
let utterance_remember_me = new SpeechSynthesisUtterance("Remember me");
let utterance_fogot_password = new SpeechSynthesisUtterance("Forgot password?");
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
        <div class = "flex justify-center items-center h-screen bg-cyan-50">
            <div class = "w-150 h-110 p-6 shadow-2xl bg-white rounded-xl">
                <form onSubmit = { handleSubmit }>
                    <h1 class = "text-3xl block text-center font-bold"
                    onMouseEnter={() => handleMouseEnter(utterance_login)}
                    onMouseLeave={handleMouseLeave}
                    >
                        <span class = "flex justify-center gap-2">
                            <FaUser />
                            Login
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
                
                    <div class = "mt-3 flex justify-between items-center font-semibold">
                        <div>
                            <span class = "flex gap-1">
                                <input type = "checkbox"></input>
                                <label
                                onMouseEnter={() => handleMouseEnter(utterance_remember_me)}
                                onMouseLeave={handleMouseLeave}
                                >
                                    Remember Me
                                </label>
                            </span>
                        </div>
                        <div>
                            <a href = "#" class = "text-yellow-600"
                            onMouseEnter={() => handleMouseEnter(utterance_fogot_password)}
                            onMouseLeave={handleMouseLeave}
                            >
                                Forgot Password?
                            </a>
                        </div>
                    </div>
                    <div class = "mt-6 font-bold flex flex-col gap-5">
                        <button type = "submit" class = "border-2 border-yellow-600 bg-yellow-600 shadow-xl rounded-sm text-white py-2 w-full cursor-pointer"
                         onMouseEnter={() => handleMouseEnter(utterance_login)}
                         onMouseLeave={handleMouseLeave}
                        >
                            Login
                        </button>
                        <a href="/voicebridge/Signup" class = "border-2 border-yellow-600 bg-yellow-600 shadow-xl rounded-sm text-white py-2 w-full cursor-pointer flex justify-center"
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