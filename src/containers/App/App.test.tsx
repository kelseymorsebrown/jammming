import { waitFor, render, screen } from '@testing-library/react';
import spotifyAPI from '../../utils/spotifyAPI';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import App from './App';

jest.mock('../../utils/spotifyAPI');
const mockedSpotifyAPI = spotifyAPI as jest.Mocked<typeof spotifyAPI>;

describe('App', () => {
  const mockValidSearch = 'test';

  let originalWindowLocation = window.location;

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

  it('renders jammming header', async () => {
    render(<App />);
    const linkElement = screen.getByText(/Jammming/i);
    expect(linkElement).toBeInTheDocument();
  });

  it('calls the spotify API when search is submitted', async () => {
    const mockGetTracksResponse: Awaited<
      ReturnType<typeof spotifyAPI.getTracks>
    > = {
      total: 2,
      next: null,
      previous: null,
      trackList: [
        {
          album: {
            id: '2up3OPMp9Tb4dAKM2erWXQ',
            name: 'Example Album',
            artists: [
              {
                id: 'string',
                name: 'Example Artist',
              },
            ],
          },
          artists: [
            {
              id: 'string',
              name: 'Example Artist',
            },
          ],
          id: 'string',
          uri: 'spotify:track:string',
          name: 'Example Track Name',
        },
        {
          album: {
            id: 'abgslw9425ew',
            name: 'Foolbum',
            artists: [
              {
                id: 'string',
                name: 'Bartist',
              },
            ],
          },
          artists: [
            {
              id: 'string',
              name: 'Bartist',
            },
          ],
          id: 'abcd',
          uri: 'spotify:track:abcd',
          name: 'Right On',
        },
      ],
    };

    const mockEndpointValue: ReturnType<typeof spotifyAPI.getSearchEndpoint> =
      '?q=test&type=track';

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

    mockedSpotifyAPI.getSearchEndpoint.mockReturnValue(mockEndpointValue);

    render(<App />);

    const input = screen.getByTestId('search-input');
    const button = screen.getByTestId('search-button');

    mockedSpotifyAPI.getTracks.mockResolvedValueOnce(mockGetTracksResponse);

    userEvent.type(input, mockValidSearch);
    userEvent.click(button);

    await waitFor(() => {
      expect(getUSerSpy).toHaveBeenCalledWith(stateKey, 'efgh5678');
      expect(screen.getByText('Example Track Name')).toBeInTheDocument();
    });
  });

  // add test to add track to playlist

  // add test to remove track from playlist

  // add test to rename playlist
});
