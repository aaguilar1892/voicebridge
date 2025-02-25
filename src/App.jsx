import { useState } from 'react';
import './App.css';
import Header from './assets/components/Header';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className='App'>
      <Header />
      <div className='bg-yellow-200 w-full h-screen'></div>
    </div>
  );
}

export default App;
