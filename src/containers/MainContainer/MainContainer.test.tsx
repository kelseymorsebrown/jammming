import { waitFor, render, screen } from '@testing-library/react';
import spotifyAPI from '../../utils/spotifyAPI';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import MainContainer from './MainContainer';
import UserProvider from '../../context/UserContext';
import { UserInitialValues } from '../../utils/types';

jest.mock('../../utils/spotifyAPI');
const mockedSpotifyAPI = spotifyAPI as jest.Mocked<typeof spotifyAPI>;

describe('MainContainer', () => {
  const mockValidSearch = 'test';

  let originalWindowLocation = window.location;

  const mockUserInit: UserInitialValues = {
    isLoggedIn: true,
    user: {
      displayName: 'testUser',
      id: 'abcd12345',
    },
    accessToken: 'efgh5678',
    expiresAt: null,
  };

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

  it('Renders the search results when valid search is submitted', async () => {
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

    mockedSpotifyAPI.getSearchEndpoint.mockReturnValue(mockEndpointValue);

    render(
      <UserProvider initialValues={mockUserInit}>
        <MainContainer />
      </UserProvider>
    );

    const input = screen.getByTestId('search-input');
    const button = screen.getByTestId('search-button');

    mockedSpotifyAPI.getTracks.mockResolvedValueOnce(mockGetTracksResponse);

    userEvent.type(input, mockValidSearch);
    userEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(`"Example Track Name"`)).toBeInTheDocument();
    });
  });

  // add test to add track to playlist

  // add test to remove track from playlist

  // add test to rename playlist
});
