// src/assets/components/Login.test.jsx
/* global describe, beforeEach, test, expect, jest */
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { TTSProvider } from '../context/TTSProvider';
import Login from './Login';

// Mock firebase auth functions if they are called directly on render (unlikely here)
// jest.mock('./firebase', () => ({ //
//   auth: {}, // Provide mock auth object if needed
// }));
// Mock SpeechSynthesis
globalThis.SpeechSynthesisUtterance = jest.fn();
globalThis.speechSynthesis = {
  speak: jest.fn(),
  cancel: jest.fn(),
};

describe('Login Component', () => {
  beforeEach(() => {
    render(
      <TTSProvider>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </TTSProvider>
    );
  });

  test('renders login form elements', () => {
    // Check for the login title
    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();

    // Check for input fields
    const usernameInput = screen.getByLabelText('Username');
    const passwordInput = screen.getByLabelText('Password');
    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();

    // Check for buttons
    const loginButton = screen.getByRole('button', { name: /login/i });
    const signupLink = screen.getByRole('link', { name: /sign up/i });
    expect(loginButton).toBeInTheDocument();
    expect(signupLink).toBeInTheDocument();
  });
});