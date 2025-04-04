import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './assets/components/Header';
import Hero from './assets/components/Hero';
import About from './assets/components/About';
import Translate from './assets/components/Translate';
import Speech from './assets/components/Speech';
import Login from './assets/components/Login';

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
      </Routes>
    </Router>
  );
}

export default App;
