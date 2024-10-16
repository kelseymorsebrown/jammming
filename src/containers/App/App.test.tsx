import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import React from 'react';

describe('App', () => {
  it('renders jammming header', async () => {
    render(<App />);
    const linkElement = screen.getByText(/Jammming/i);
    expect(linkElement).toBeInTheDocument();
  });
});
