// src/assets/components/Hero.test.jsx
/* global describe, beforeEach, test, expect, jest */
import { render, screen } from '@testing-library/react';
import { TTSProvider } from '../context/TTSProvider';
import Hero from './Hero';

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    h1: ({ children, ...props }) => <h1 {...props}>{children}</h1>,
    p: ({ children, ...props }) => <p {...props}>{children}</p>,
    img: ({ children, ...props }) => <img {...props}>{children}</img>,
  },
}));

describe('Hero Component', () => {
  beforeEach(() => {
    render(
      <TTSProvider>
        <Hero />
      </TTSProvider>
    );
  });

  test('renders the welcome message', () => {
    expect(screen.getByText(/Welcome to/i)).toBeInTheDocument();
    expect(screen.getByText(/VoiceBridge/i)).toBeInTheDocument();
  });

  test('renders the subtitle', () => {
    expect(screen.getByText(/Your Personal ASL Interpreter and Translator!/i)).toBeInTheDocument();
  });

  test('renders navigation elements', () => {
    expect(screen.getByText('Get Started')).toBeInTheDocument();
    expect(screen.getByText('Log in')).toBeInTheDocument();
  });

  test('renders the hero image', () => {
    expect(screen.getByAltText('Hero')).toBeInTheDocument();
  });
});