import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './assets/components/Header';
import Hero from './assets/components/Hero';
import About from './assets/components/About';
import Translate from './assets/components/Translate';
import Speech from './assets/components/Speech';
import Login from './assets/components/Login';
import Signup from './assets/components/Signup';
import Practice from './assets/components/Practice';
//import Exercises from './assets/components/ExercisesPage';
import Flashcards from './assets/components/FlashcardsPage';
//import Tutorial from './assets/components/TutorialPage';
import Alphabet from './assets/components/Alphabet';


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        {/* Change path="/voicebridge" to path="/" */}
        <Route path="/voicebridge" element={
          <div className='App'>
            <section id="home">
              <Hero />
            </section>
            <div className="h-[2px] bg-gray-400 w-full"></div>
            <section id="about-section">
              <About />
            </section>
          </div>
        } />
        <Route path="/voicebridge/translate" element={<Translate />} />
        <Route path="/voicebridge/speech" element={<Speech />} />
        <Route path="/voicebridge/login" element={<Login />} />
        <Route path="/voicebridge/signup" element={<Signup />} />
        <Route path="/voicebridge/practice" element={<Practice />} />
        <Route path="/voicebridge/practice/flashcards" element={<Flashcards />} />
        <Route path="/voicebridge/practice/flashcards/alphabet" element={<Alphabet />} />

      </Routes>
    </Router>
  );
}

//<Route path="/voicebridge/practice/exercises" element={<Exercises />} />
//<Route path="/voicebridge/practice/tutorial" element={<Tutorial />} />

export default App;
