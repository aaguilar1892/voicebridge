// src/App.test.jsx
/* global describe, beforeEach, test, expect, jest */
import { render, screen } from '@testing-library/react';
import { TTSProvider } from './assets/context/TTSProvider';
import App from './App';

// Mock react-router-dom
jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return {
    ...actual,
    useLocation: () => ({
      pathname: '/voicebridge',
    }),
    useNavigate: () => jest.fn(),
    Routes: actual.Routes,
    Route: actual.Route,
  };
});

// Custom render function that wraps the component with necessary providers
const customRender = (ui) => {
  return render(
    <TTSProvider>
      {ui}
    </TTSProvider>
  );
};

describe('App Component', () => {
  beforeEach(() => {
    customRender(<App />);
  });

  test('renders the main application structure', () => {
    // Use more specific selectors to avoid multiple matches
    expect(screen.getByRole('heading', { name: /welcome to voicebridge/i })).toBeInTheDocument();
  });

  test('renders the navigation links', () => {
    // Use more specific selectors to avoid multiple matches
    expect(screen.getByRole('button', { name: /about/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /translate/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /speech/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /practice/i })).toBeInTheDocument();
  });
});