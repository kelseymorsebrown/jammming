import React, { createContext, useState } from 'react';

import spotifyAPI from '../utils/spotifyAPI';

import {
  SearchResults,
  SearchContextType,
  SearchInitialValues,
} from '../utils/types';

export const SearchContext = createContext<SearchContextType | null>(null);

const SearchProvider: React.FC<{
  initialValues: SearchInitialValues;
  children: React.ReactNode;
}> = ({ initialValues, children }) => {
  const [searchResults, setSearchResults] = useState<SearchResults | null>(
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

  const extractSearchParamsFromURL = (url: string) => {
    const newURL = new URL(url);
    const searchQuery = new URLSearchParams(newURL.search);
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
      setSearchResults(results);
    }

    console.log(`Next: ${results?.next}`);
    console.log(`Previous: ${results?.previous}`);

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
        extractSearchParamsFromURL,
        searchSpotify,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
