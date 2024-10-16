import React from 'react';
import SearchResults from '../../components/SearchResults/SearchResults';
import SearchErrorMessage from '../../components/SearchErrorMessage/SearchErrorMessage';
import { SearchContext } from '../../context/SearchContext';
import { PlaylistContext } from '../../context/PlaylistContext';
import { UserContext } from '../../context/UserContext';
import styles from './SearchResultsContainer.module.css';
import mainStyles from '../MainContainer/MainContainer.module.css';

// Import Types
import {
  TrackButton,
  SearchContextType,
  PlaylistContextType,
  UserContextType,
  NavButton,
} from '../../utils/types';

function SearchResultsContainer() {
  const {
    errorMessage,
    searchResults,
    extractSearchParamsFromURL,
    searchSpotify,
  } = React.useContext(SearchContext) as SearchContextType;

  const { accessToken } = React.useContext(UserContext) as UserContextType;

  const { addTrack } = React.useContext(PlaylistContext) as PlaylistContextType;

  const addButton: TrackButton = {
    label: '﹢',
    ariaLabel: 'Add Track',
    callback: addTrack,
  };

  const handlePrevClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (searchResults?.previous) {
      const encodedQueryParams: string = extractSearchParamsFromURL(
        searchResults.previous
      );

      searchSpotify(encodedQueryParams, accessToken);
    }
  };

  const handleNextClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (searchResults?.next) {
      const encodedQueryParams: string = extractSearchParamsFromURL(
        searchResults.next
      );

      searchSpotify(encodedQueryParams, accessToken);
    }
  };

  const prevButton: NavButton = {
    label: '⏴',
    ariaLabel: 'Previous',
    id: 'previous-button',
    callback: handlePrevClick,
    enabled: !!searchResults?.previous,
  };

  const nextButton: NavButton = {
    label: '⏵',
    ariaLabel: 'Next',
    id: 'next-button',
    callback: handleNextClick,
    enabled: !!searchResults?.next,
  };

  return (
    <div className={`${mainStyles.colLeft} ${mainStyles.ColumnWrapper}`}>
      {searchResults?.trackList ? (
        <SearchResults
          tracks={searchResults.trackList}
          trackButton={addButton}
          nextButton={nextButton}
          prevButton={prevButton}
        />
      ) : (
        <SearchErrorMessage errorMessage={errorMessage} />
      )}
    </div>
  );
}

export default SearchResultsContainer;
