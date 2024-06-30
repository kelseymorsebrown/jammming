import { render, screen } from '@testing-library/react';
import App from './App';

test('renders jammming header', () => {
  render(<App />);
  const linkElement = screen.getByText(/Jammming/i);
  expect(linkElement).toBeInTheDocument();
});
