import React from 'react';
import SearchResults from '../../components/SearchResults/SearchResults';
import SearchErrorMessage from '../../components/SearchErrorMessage/SearchErrorMessage';
import { SearchContext } from '../../context/SearchContext';
import { PlaylistContext } from '../../context/PlaylistContext';
import { UserContext } from '../../context/UserContext';
import mainStyles from '../MainContainer/MainContainer.module.css';
import styles from './SearchResultsContainer.module.css';

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
      <div className={styles.ResultsSubhead}>
        <div className={`${mainStyles.insetBox} ${mainStyles.subheader}`}>
          <h2>Results</h2>
        </div>
        <div className={styles.navButtons}>
          <button
            className={`${mainStyles.pushable} ${mainStyles.yellowBtn} ${mainStyles.insetGreyBG}`}
            onClick={prevButton.callback}
            name={prevButton.id}
            aria-label={prevButton.ariaLabel}
            id={prevButton.id}
            data-testid={prevButton.id}
            disabled={!prevButton.enabled}
          >
            <span className={mainStyles.front}>{prevButton.label}</span>
          </button>
          <button
            onClick={nextButton.callback}
            className={`${mainStyles.pushable} ${mainStyles.yellowBtn} ${mainStyles.insetGreyBG}`}
            name={nextButton.id}
            aria-label={nextButton.ariaLabel}
            id={nextButton.id}
            data-testid={nextButton.id}
            disabled={!nextButton.enabled}
          >
            <span className={mainStyles.front}>{nextButton.label}</span>
          </button>
        </div>
      </div>
      {searchResults?.trackList ? (
        <SearchResults
          tracks={searchResults.trackList}
          trackButton={addButton}
        />
      ) : (
        <SearchErrorMessage errorMessage={errorMessage} />
      )}
    </div>
  );
}

export default SearchResultsContainer;
