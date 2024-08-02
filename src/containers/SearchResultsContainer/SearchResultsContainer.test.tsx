import { render, screen } from '@testing-library/react';
import SearchResultsContainer from './SearchResultsContainer';
import '@testing-library/jest-dom';

import SearchProvider from '../../context/SearchContext';
import PlaylistProvider from '../../context/PlaylistContext';

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

  const plInit = {
    tracks: [],
    name: '',
  };

  it('renders the search results component when there are results', () => {
    const srInit = {
      results: mockTrackList,
      term: 'test',
      err: null,
    };

    render(
      <SearchProvider initialValues={srInit}>
        <PlaylistProvider initialValues={plInit}>
          <SearchResultsContainer />
        </PlaylistProvider>
      </SearchProvider>
    );

    expect(screen.queryByTestId('search-results')).toBeInTheDocument();
  });

  it('renders the error component when there are no search results', () => {
    const srInit = {
      results: null,
      term: '',
      err: 'Please enter a search term.',
    };

    render(
      <SearchProvider initialValues={srInit}>
        <PlaylistProvider initialValues={plInit}>
          <SearchResultsContainer />
        </PlaylistProvider>
      </SearchProvider>
    );

    expect(screen.queryByTestId('search-error')).toBeInTheDocument();
  });
});
