import React from 'react';
import { waitFor, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginContainer from './LoginContainer';
import UserProvider from '../../context/UserContext';
import spotifyAPI from '../../utils/spotifyAPI';
import '@testing-library/jest-dom';
/* eslint-disable no-empty-function, @typescript-eslint/no-empty-function */

describe('LoginContainer', () => {
  const originalWindowLocation = window.location;

  beforeEach(() => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      enumerable: true,
      value: new URL(window.location.href),
    });
  });

  afterEach(() => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      enumerable: true,
      value: originalWindowLocation,
    });
  });

  const userInit = {
    isLoggedIn: false,
    user: null,
    accessToken: null,
    expiresAt: null,
  };

  it('Displays the login button', async () => {
    render(
      <UserProvider initialValues={userInit}>
        <LoginContainer />
      </UserProvider>
    );

    expect(screen.getByText('Log in with Spotify')).toBeInTheDocument();
  });

  it('redirects to the spotify API when login is clicked', async () => {
    window.location.assign = jest.fn();

    render(
      <UserProvider initialValues={userInit}>
        <LoginContainer />
      </UserProvider>
    );

    const button = screen.getByTestId('login-button');
    userEvent.click(button);

    await waitFor(() => {
      expect(window.location.assign).toHaveBeenCalled();
    });
  });

  it('logs an error when access is denied', async () => {
    window.location.search = 'error=access_denied&state=abcd123';
    window.location.hash = '';

    const spiedErr = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <UserProvider initialValues={userInit}>
        <LoginContainer />
      </UserProvider>
    );

    await waitFor(() => {
      expect(spiedErr).toHaveBeenCalledWith(
        'There was an error during the authentication: access_denied'
      );
    });

    spiedErr.mockReset();
  });

  it('displays the username when access is granted', async () => {
    jest.mock('../../utils/spotifyAPI');
    const mockedSpotifyAPI = spotifyAPI as jest.Mocked<typeof spotifyAPI>;
    const stateKey = 'spotify_auth_state';

    window.localStorage.setItem(stateKey, '1234');

    window.location.search = '';
    window.location.hash =
      '#access_token=efgh5678&token_type=Bearer&expires_in=3600&state=1234';

    const mockGetUser: Awaited<ReturnType<typeof spotifyAPI.getUser>> = {
      displayName: 'Test User',
      id: 'testuser',
    };

    const getUSerSpy = jest.spyOn(spotifyAPI, 'getUser');
    mockedSpotifyAPI.getUser.mockResolvedValue(mockGetUser);

    render(
      <UserProvider initialValues={userInit}>
        <LoginContainer />
      </UserProvider>
    );

    await waitFor(() => {
      expect(getUSerSpy).toHaveBeenCalledWith(stateKey, 'efgh5678');
      expect(screen.getByText('Logged in as Test User')).toBeInTheDocument();
    });
  });

  it('calls the spotify API for the user access is granted', async () => {
    jest.mock('../../utils/spotifyAPI');
    const mockedSpotifyAPI = spotifyAPI as jest.Mocked<typeof spotifyAPI>;

    const stateKey = 'spotify_auth_state';

    window.localStorage.setItem(stateKey, '1234');

    window.location.search = '';
    window.location.hash =
      '#access_token=efgh5678&token_type=Bearer&expires_in=3600&state=1234';

    const mockGetUser: Awaited<ReturnType<typeof spotifyAPI.getUser>> = {
      displayName: 'Test User',
      id: 'testuser',
    };

    const getUSerSpy = jest.spyOn(spotifyAPI, 'getUser');

    mockedSpotifyAPI.getUser.mockResolvedValue(mockGetUser);

    render(
      <UserProvider initialValues={userInit}>
        <LoginContainer />
      </UserProvider>
    );

    await waitFor(() => {
      expect(getUSerSpy).toHaveBeenCalledWith(stateKey, 'efgh5678');
    });
  });
});
/* eslint-enable no-empty-function, @typescript-eslint/no-empty-function */
