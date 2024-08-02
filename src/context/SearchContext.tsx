import React, { createContext, useState } from 'react';

import spotifyAPI from '../utils/spotifyAPI';

import {
  TrackData,
  SearchContextType,
  SearchInitialValues,
} from '../utils/types';

const mockTrack: TrackData = {
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
};

const mockTrack2: TrackData = {
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
};

const mockTrackList = [mockTrack, mockTrack2];

export const SearchContext = createContext<SearchContextType | null>(null);

const SearchProvider: React.FC<{
  initialValues: SearchInitialValues;
  children: React.ReactNode;
}> = ({ initialValues, children }) => {
  const [searchResults, setSearchResults] = useState<TrackData[] | null>(
    initialValues.results
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(
    initialValues.err
  );
  const [searchTerm, setSearchTerm] = useState(initialValues.term);

  const constructSearchParamsFromQuery = (query: string) => {
    const searchQuery = new URLSearchParams([
      ['q', query],
      ['type', 'track'],
    ]);
    return searchQuery.toString();
  };

  const searchSpotify = async (
    encodedQuery: string,
    accessToken: string | null
  ) => {
    if (!accessToken) {
      setErrorMessage(
        `Please log in to Spotify and authorize this application.`
      );
      setSearchResults(null);
      return;
    }

    const endpoint = spotifyAPI.getSearchEndpoint(encodedQuery);

    const results = await spotifyAPI.getTracks(endpoint, accessToken);

    if (results?.trackList) {
      setSearchResults(results.trackList);
    }

    if (!searchResults) {
      setErrorMessage(`Something went wrong. Please try again.`);
    } else {
      setErrorMessage(null);
    }

    return;
  };

  return (
    <SearchContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        searchResults,
        setSearchResults,
        errorMessage,
        setErrorMessage,
        constructSearchParamsFromQuery,
        searchSpotify,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
