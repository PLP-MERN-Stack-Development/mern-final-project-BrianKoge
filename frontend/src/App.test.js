import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// Mock all child components to simplify the test
jest.mock('./pages/Home', () => () => <div>Home Page</div>);
jest.mock('./pages/Login', () => () => <div>Login Page</div>);
jest.mock('./pages/Register', () => () => <div>Register Page</div>);
jest.mock('./pages/Dashboard', () => () => <div>Dashboard Page</div>);
jest.mock('./pages/Projects', () => () => <div>Projects Page</div>);
jest.mock('./pages/ProjectDetail', () => () => <div>Project Detail Page</div>);
jest.mock('./pages/Tasks', () => () => <div>Tasks Page</div>);
jest.mock('./pages/Profile', () => () => <div>Profile Page</div>);
jest.mock('./components/layout/Navbar', () => () => <div>Navbar</div>);
jest.mock('./components/layout/Alert', () => () => <div>Alert</div>);

describe('App Component', () => {
  test('renders without crashing', () => {
    render(<App />);
    
    // Just check that the app renders without errors
    expect(screen.getByText('Navbar')).toBeInTheDocument();
    expect(screen.getByText('Alert')).toBeInTheDocument();
  });
});