// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBbeRv0-_oB_bGIbO6gWmr8q3_RErxigmA",
  authDomain: "authentication-f9ea8.firebaseapp.com",
  projectId: "authentication-f9ea8",
  storageBucket: "authentication-f9ea8.firebasestorage.app",
  messagingSenderId: "698251342666",
  appId: "1:698251342666:web:94e24e6d2c3076af9147b3",
  measurementId: "G-DNJMK8HLBG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {auth};

const analytics = getAnalytics(app);