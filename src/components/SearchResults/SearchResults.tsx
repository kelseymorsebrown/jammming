import React from 'react';
import styles from './SearchResults.module.css';
import Tracklist from '../Tracklist/Tracklist';
import mainStyles from '../../containers/MainContainer/MainContainer.module.css';

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
      <Tracklist tracks={tracks} trackButton={trackButton} />
    </div>
  );
}

export default SearchResults;
