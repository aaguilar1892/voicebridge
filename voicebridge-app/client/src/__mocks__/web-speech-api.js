// Mock SpeechSynthesisUtterance
class MockSpeechSynthesisUtterance {
  constructor(text) {
    this.text = text;
    this.lang = 'en-US';
    this.pitch = 1;
    this.rate = 1;
    this.volume = 1;
    this.voice = null;
  }
}

// Mock SpeechSynthesis
const mockSpeechSynthesis = {
  speak: jest.fn(),
  cancel: jest.fn(),
  pause: jest.fn(),
  resume: jest.fn(),
  getVoices: jest.fn().mockReturnValue([]),
  pending: false,
  speaking: false,
  paused: false,
};

// Add to global
globalThis.SpeechSynthesisUtterance = MockSpeechSynthesisUtterance;
globalThis.speechSynthesis = mockSpeechSynthesis; 