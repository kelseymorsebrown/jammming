import { waitFor, render, screen } from '@testing-library/react';
import spotifyAPI from '../../utils/spotifyAPI';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import App from './App';

describe('App', () => {
  it('renders jammming header', async () => {
    render(<App />);
    const linkElement = screen.getByText(/Jammming/i);
    expect(linkElement).toBeInTheDocument();
  });
});
