import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';
import './src/__mocks__/web-speech-api';

// Add TextEncoder and TextDecoder polyfills
if (typeof globalThis.TextEncoder === 'undefined') {
  globalThis.TextEncoder = TextEncoder;
  globalThis.TextDecoder = TextDecoder;
}