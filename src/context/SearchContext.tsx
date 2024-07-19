import React, { createContext, useState } from 'react';
import { TrackData, SearchContextType, SearchInitialValues } from '../types';

const mockTrack: TrackData = {
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
};

const mockTrack2: TrackData = {
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

  const searchSpotify = async (searchTerm: string) => {
    if (searchTerm === '') {
      setErrorMessage(`Please enter a search term.`);
      setSearchResults(null);
      return;
    }

    const tracks = mockTrackList;

    setSearchResults(tracks);

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
        searchResults,
        errorMessage,
        setSearchTerm,
        searchSpotify,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
