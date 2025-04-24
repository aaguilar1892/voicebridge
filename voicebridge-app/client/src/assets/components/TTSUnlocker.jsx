import React, { useEffect, useState } from 'react';

const TTSUnlocker = () => {
  const [unlocked, setUnlocked] = useState(() => {
    return localStorage.getItem('ttsUnlocked') === 'true';
  });

  useEffect(() => {
    if (unlocked) {
      localStorage.setItem('ttsUnlocked', 'true');
      const utterance = new SpeechSynthesisUtterance("VoiceBridge is now ready.");
      speechSynthesis.speak(utterance);
    }
  }, [unlocked]);

  if (unlocked) return null;

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Welcome to VoiceBridge</h1>
      <button
        onClick={() => setUnlocked(true)}
        className="px-6 py-4 text-2xl bg-yellow-600 text-white rounded-lg shadow hover:bg-yellow-700 transition"
      >
        Enable Text-to-Speech
      </button>
    </div>
  );
};

export default TTSUnlocker;
