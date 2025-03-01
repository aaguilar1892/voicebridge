import { useState } from 'react';
import { Link } from "react-scroll";
import './App.css';
import Header from './assets/components/Header';
import Hero from './assets/components/Hero';
import About from './assets/components/About';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className='App'>
        <Header />
      <section id="home">
        <Hero />
      </section>

      <div className="h-[2px] bg-gray-400 w-full"></div>

      <section id="about-section">
        <About />
      </section>
    </div>
  );
}

export default App;


