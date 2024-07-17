import { waitFor, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from './App';

test('renders jammming header', () => {
  render(<App />);
  const linkElement = screen.getByText(/Jammming/i);
  expect(linkElement).toBeInTheDocument();
});

// add test to search

// add test to add track to playlist

// add test to remove track from playlist

// add test to rename playlist