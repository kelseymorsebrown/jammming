import { render, screen } from '@testing-library/react';
import SearchBar from './SearchBar';
import SearchProvider from '../../context/SearchContext';

import '@testing-library/jest-dom';

const srInit = {
  results: null,
  term: '',
  err: null,
};
it('Displays the search button', async () => {
  render(
    <SearchProvider initialValues={srInit}>
      <SearchBar />
    </SearchProvider>
  );

  expect(screen.getByText('Search')).toBeInTheDocument();
});

it('Displays the search placeholder text', async () => {
  render(
    <SearchProvider initialValues={srInit}>
      <SearchBar />
    </SearchProvider>
  );

  expect(screen.queryByPlaceholderText(/Search Spotify/i)).toBeInTheDocument();
});
