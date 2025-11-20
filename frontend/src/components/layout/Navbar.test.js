import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './Navbar';

// Mock context
const mockAuthContext = {
  isAuthenticated: false,
  logout: jest.fn(),
  user: null
};

jest.mock('../../context/auth/authContext', () => ({
  __esModule: true,
  default: {
    Consumer: ({ children }) => children(mockAuthContext)
  }
}));

describe('Navbar Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders navbar with guest links when not authenticated', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    expect(screen.getByText('TaskFlow')).toBeInTheDocument();
    expect(screen.getByText('Register')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  test('renders navbar with auth links when authenticated', () => {
    mockAuthContext.isAuthenticated = true;
    mockAuthContext.user = { name: 'Test User' };

    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    expect(screen.getByText('Hello Test User')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
    expect(screen.queryByText('Register')).not.toBeInTheDocument();
    expect(screen.queryByText('Login')).not.toBeInTheDocument();
  });
});