import { waitFor, render, screen } from '@testing-library/react';
import SearchBar from './SearchBar';
import SearchProvider from '../../context/SearchContext';
import UserProvider from '../../context/UserContext';
import spotifyAPI from '../../utils/spotifyAPI';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

jest.mock('../../utils/spotifyAPI');

describe('SearchBar', () => {
  const srInit = {
    results: null,
    term: '',
    err: null,
  };

  const userInit = {
    isLoggedIn: false,
    user: null,
    accessToken: null,
    expiresAt: null,
  };

  const mockValidSearch = 'test';

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

    expect(
      screen.queryByPlaceholderText(/Search Spotify/i)
    ).toBeInTheDocument();
  });

  it('updates playlist name with user input', async () => {
    const handleSearchTermChange = jest.fn();

    render(
      <UserProvider initialValues={userInit}>
        <SearchProvider initialValues={srInit}>
          <SearchBar />
        </SearchProvider>
      </UserProvider>
    );

    const input = screen.getByTestId('search-input');

    expect(input?.getAttribute('value')).toBeNull;

    userEvent.type(input, mockValidSearch);

    await waitFor(() => {
      const searchTerm = screen
        .getByTestId('search-input')
        ?.getAttribute('value');
      expect(searchTerm).toEqual(mockValidSearch);
      expect(handleSearchTermChange).toHaveBeenCalled;
    });
  });

  it('calls the spotify API when search is submitted', async () => {
    render(
      <UserProvider initialValues={userInit}>
        <SearchProvider initialValues={srInit}>
          <SearchBar />
        </SearchProvider>
      </UserProvider>
    );

    const input = screen.getByTestId('search-input');
    const button = screen.getByTestId('search-button');

    userEvent.type(input, mockValidSearch);
    userEvent.click(button);

    await waitFor(() => {
      expect(spotifyAPI.getTracks).toHaveBeenCalled;
    });
  });
});
