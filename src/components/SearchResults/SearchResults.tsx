import React from 'react';
import styles from './SearchResults.module.css';
import Tracklist from '../Tracklist/Tracklist';

// Import Types
import { TrackData, TrackButton, NavButton } from '../../utils/types';

type SearchResultsProps = {
  tracks: TrackData[];
  trackButton: TrackButton;
  nextButton: NavButton;
  prevButton: NavButton;
};
function SearchResults({
  tracks,
  trackButton,
  nextButton,
  prevButton,
}: SearchResultsProps) {
  return (
    <div className={styles.SearchResults} data-testid="search-results">
      <div className={styles.subhead}>
        <h2>Results</h2>
        <div className={styles.navButtons}>
          <button
            onClick={prevButton.callback}
            name={prevButton.id}
            aria-label={prevButton.ariaLabel}
            id={prevButton.id}
            data-testid={prevButton.id}
            disabled={!prevButton.enabled}
          >
            {prevButton.label}
          </button>
          <button
            onClick={nextButton.callback}
            name={nextButton.id}
            aria-label={nextButton.ariaLabel}
            id={nextButton.id}
            data-testid={nextButton.id}
            disabled={!nextButton.enabled}
          >
            {nextButton.label}
          </button>
        </div>
      </div>
      <Tracklist tracks={tracks} trackButton={trackButton} />
    </div>
  );
}

export default SearchResults;
