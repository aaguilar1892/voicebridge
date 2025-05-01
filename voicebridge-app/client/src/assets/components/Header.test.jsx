/* global describe, beforeEach, test, expect */
// src/assets/components/Header.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { TTSProvider } from '../context/TTSProvider';
import Header from './Header';

describe('Header Component', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <TTSProvider>
          <Header />
        </TTSProvider>
      </MemoryRouter>
    );
  });

  test('renders the brand name "VoiceBridge"', () => {
    expect(screen.getByText('VoiceBridge')).toBeInTheDocument();
  });

  test('renders navigation links', () => {
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Translate')).toBeInTheDocument();
    expect(screen.getByText('Speech')).toBeInTheDocument();
    expect(screen.getByText('Practice')).toBeInTheDocument();
  });

  test('renders the "Get Started" button', () => {
    expect(screen.getByRole('link', { name: /get started/i })).toBeInTheDocument();
  });

  test('renders the TTS toggle button', () => {
    expect(screen.getByRole('button', { name: /tts/i })).toBeInTheDocument();
  });
});