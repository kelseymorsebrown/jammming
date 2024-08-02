import { render, screen } from '@testing-library/react';
import SearchBar from './SearchBar';
import SearchProvider from '../../context/SearchContext';
import UserProvider from '../../context/UserContext';

import '@testing-library/jest-dom';

const srInit = {
  results: null,
  term: '',
  err: null,
};

const userInit = {
  isLoggedIn: false,
  displayName: null,
  accessToken: null,
  expiresAt: null,
};

it('Displays the search button', async () => {
  render(
    <UserProvider initialValues={userInit}>
      <SearchProvider initialValues={srInit}>
        <SearchBar />
      </SearchProvider>
    </UserProvider>
  );

  expect(screen.getByText('Search')).toBeInTheDocument();
});

it('Displays the search placeholder text', async () => {
  render(
    <UserProvider initialValues={userInit}>
      <SearchProvider initialValues={srInit}>
        <SearchBar />
      </SearchProvider>
    </UserProvider>
  );

  expect(screen.queryByPlaceholderText(/Search Spotify/i)).toBeInTheDocument();
});
