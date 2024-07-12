import { render, screen } from '@testing-library/react';
import SearchBar from './SearchBar';
import '@testing-library/jest-dom';

it('Displays the search button', async () => {
  render(
    <SearchBar
      searchSpotify={() => { }}
    />
  );

  expect(screen.getByText('Search')).toBeInTheDocument();
})

it('Displays the search placeholder text', async () => {
  render(
    <SearchBar
      searchSpotify={() => { }}
    />
  );

  expect(screen.queryByPlaceholderText(/Search Spotify/i)).toBeInTheDocument();
})