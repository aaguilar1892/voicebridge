import React, { useState, useEffect } from 'react';
import { TTSContext } from './TTSContext';

export const TTSProvider = ({ children }) => {
  const [ttsEnabled, setTTSEnabled] = useState(() => {
    const saved = localStorage.getItem('ttsEnabled');
    return saved !== null ? JSON.parse(saved) : true;
  });

  const toggleTTS = () => setTTSEnabled(prev => !prev);

  useEffect(() => {
    localStorage.setItem('ttsEnabled', JSON.stringify(ttsEnabled));
  }, [ttsEnabled]);

  return (
    <TTSContext.Provider value={{ ttsEnabled, toggleTTS }}>
      {children}
    </TTSContext.Provider>
  );
};
