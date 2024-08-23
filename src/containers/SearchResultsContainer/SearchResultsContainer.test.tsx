import { waitFor, render, screen } from '@testing-library/react';
import SearchResultsContainer from './SearchResultsContainer';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import SearchProvider from '../../context/SearchContext';
import PlaylistProvider from '../../context/PlaylistContext';
import spotifyAPI from '../../utils/spotifyAPI';
import {
  PlaylistInitialValues,
  SearchInitialValues,
  UserInitialValues,
} from '../../utils/types';
import UserProvider from '../../context/UserContext';

describe('SearchResultsContainer', () => {
  const mockTrackList = [
    {
      album: {
        id: '2up3OPMp9Tb4dAKM2erWXQ',
        name: 'Example Album',
        type: 'album',
        artists: [
          {
            id: 'string',
            name: 'Example Artist',
            type: 'artist',
          },
        ],
      },
      artists: [
        {
          id: 'string',
          name: 'Example Artist',
          type: 'artist',
        },
      ],
      id: 'string',
      uri: 'spotify:track:string',
      name: 'Example Track Name',
      type: 'track',
    },
    {
      album: {
        id: 'abgslw9425ew',
        name: 'Foolbum',
        type: 'album',
        artists: [
          {
            id: 'string',
            name: 'Bartist',
            type: 'artist',
          },
        ],
      },
      artists: [
        {
          id: 'string',
          name: 'Bartist',
          type: 'artist',
        },
      ],
      id: 'abcd',
      uri: 'spotify:track:abcd',
      name: 'Right On',
      type: 'track',
    },
  ];

  const mockPlInit: PlaylistInitialValues = {
    tracks: [],
    name: '',
  };

  const mockUserInit: UserInitialValues = {
    isLoggedIn: true,
    user: {
      displayName: 'testUser',
      id: 'abcd12345',
    },
    accessToken: 'efgh5678',
    expiresAt: null,
  };

  const mockSerResInit = {
    results: {
      trackList: mockTrackList,
      total: 6,
      next: null,
      previous: null,
    },
    term: 'test',
    err: null,
  };

  jest.mock('../../utils/spotifyAPI');
  const mockedSpotifyAPI = spotifyAPI as jest.Mocked<typeof spotifyAPI>;
  const getTracksSpy = jest.spyOn(spotifyAPI, 'getTracks');

  function renderSearchResultsContainer(
    mockUserInit: UserInitialValues,
    mockSearchInit: SearchInitialValues,
    mockPlaylistInit: PlaylistInitialValues
  ) {
    render(
      <UserProvider initialValues={mockUserInit}>
        <SearchProvider initialValues={mockSearchInit}>
          <PlaylistProvider initialValues={mockPlaylistInit}>
            <SearchResultsContainer />
          </PlaylistProvider>
        </SearchProvider>
      </UserProvider>
    );
  }

  it('renders the search results component when there are results', () => {
    renderSearchResultsContainer(mockUserInit, mockSerResInit, mockPlInit);

    expect(screen.queryByTestId('search-results')).toBeInTheDocument();
  });

  it('renders the error component when there are no search results', () => {
    const mockResult = {
      ...mockSerResInit,
      results: null,
      err: 'Please enter a search term.',
    };

    renderSearchResultsContainer(mockUserInit, mockResult, mockPlInit);

    expect(screen.queryByTestId('search-error')).toBeInTheDocument();
  });

  it('calls the spotify API getTracks with correct endpoint when next is clicked', async () => {
    const mockBaseUrl = 'https://api.spotify.com/v1/search?';

    const mockQuerys = [
      'query=test&type=track&offset=0&limit=2',
      'query=test&type=track&offset=2&limit=2',
      'query=test&type=track&offset=4&limit=2',
    ];

    const mockInitResult = {
      ...mockSerResInit,
      results: {
        ...mockSerResInit.results,
        next: `${mockBaseUrl}${mockQuerys[1]}`,
      },
    };

    mockedSpotifyAPI.getTracks
      .mockResolvedValue({
        trackList: mockTrackList,
        total: 6,
        previous: null,
        next: `${mockBaseUrl}${mockQuerys[1]}`,
      })
      .mockResolvedValueOnce({
        trackList: mockTrackList,
        total: 6,
        previous: `${mockBaseUrl}${mockQuerys[0]}`,
        next: `${mockBaseUrl}${mockQuerys[2]}`,
      })
      .mockResolvedValueOnce({
        trackList: mockTrackList,
        total: 6,
        previous: `${mockBaseUrl}${mockQuerys[1]}`,
        next: null,
      });

    // initial render as if on the first page of results
    renderSearchResultsContainer(mockUserInit, mockInitResult, mockPlInit);

    const previousButton = screen.getByTestId('previous-button');
    const nextButton = screen.getByTestId('next-button');

    // first click of 'next'
    await userEvent.click(nextButton);

    await waitFor(() => {
      expect(getTracksSpy).toHaveBeenCalledWith(
        `${mockBaseUrl}${mockQuerys[1]}`,
        mockUserInit.accessToken
      );
    });

    // await re-render w/enabled previous button before clicking 'next' button again
    await waitFor(() => {
      expect(previousButton).not.toBeDisabled();
    });

    // second click of 'next'
    await userEvent.click(nextButton);

    await waitFor(() => {
      expect(getTracksSpy).toHaveBeenCalledWith(
        `${mockBaseUrl}${mockQuerys[2]}`,
        mockUserInit.accessToken
      );
    });

    getTracksSpy.mockReset;
  });

  it('calls the spotify API getTracks with correct endpoint when previous is clicked', async () => {
    const mockBaseUrl = 'https://api.spotify.com/v1/search?';

    const mockQuerys = [
      'query=test&type=track&offset=0&limit=2',
      'query=test&type=track&offset=2&limit=2',
      'query=test&type=track&offset=4&limit=2',
    ];

    const mockInitResult = {
      ...mockSerResInit,
      results: {
        ...mockSerResInit.results,
        previous: `${mockBaseUrl}${mockQuerys[1]}`,
      },
    };

    mockedSpotifyAPI.getTracks
      .mockResolvedValue({
        trackList: mockTrackList,
        total: 6,
        previous: `${mockBaseUrl}${mockQuerys[1]}`,
        next: null,
      })
      .mockResolvedValueOnce({
        trackList: mockTrackList,
        total: 6,
        previous: `${mockBaseUrl}${mockQuerys[0]}`,
        next: `${mockBaseUrl}${mockQuerys[2]}`,
      })
      .mockResolvedValueOnce({
        trackList: mockTrackList,
        total: 6,
        previous: null,
        next: `${mockBaseUrl}${mockQuerys[1]}`,
      });

    // initial render as if on the last page of results
    renderSearchResultsContainer(mockUserInit, mockInitResult, mockPlInit);

    const previousButton = screen.getByTestId('previous-button');
    const nextButton = screen.getByTestId('next-button');

    // first click of 'previous'
    await userEvent.click(previousButton);

    await waitFor(() => {
      expect(getTracksSpy).toHaveBeenCalledWith(
        `${mockBaseUrl}${mockQuerys[1]}`,
        mockUserInit.accessToken
      );
    });

    // await re-render w/enabled next button before clicking 'previous' button again
    await waitFor(() => {
      expect(nextButton).not.toBeDisabled();
    });

    // second click of 'previous'
    await userEvent.click(previousButton);

    await waitFor(() => {
      expect(getTracksSpy).toHaveBeenCalledWith(
        `${mockBaseUrl}${mockQuerys[0]}`,
        mockUserInit.accessToken
      );
    });

    getTracksSpy.mockReset;
  });
});
