import React from 'react';
import { render, screen } from '@testing-library/react';
import Alert from './Alert';

// Mock context
const mockAlertContext = {
  alerts: []
};

jest.mock('../../context/alert/alertContext', () => ({
  __esModule: true,
  default: {
    Consumer: ({ children }) => children(mockAlertContext)
  }
}));

describe('Alert Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('does not render when there are no alerts', () => {
    render(<Alert />);
    
    // Since there are no alerts, nothing should be rendered
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  test('renders alerts when they exist', () => {
    mockAlertContext.alerts = [
      { id: '1', msg: 'Success message', type: 'success' },
      { id: '2', msg: 'Error message', type: 'danger' }
    ];

    render(<Alert />);
    
    expect(screen.getByText('Success message')).toBeInTheDocument();
    expect(screen.getByText('Error message')).toBeInTheDocument();
    expect(screen.getByText('Success message')).toHaveClass('alert-success');
    expect(screen.getByText('Error message')).toHaveClass('alert-danger');
  });
});