import React from 'react';
import styles from './SearchResults.module.css';
import Tracklist from '../Tracklist/Tracklist';

// Import Types
import { TrackData, TrackButton } from '../types'

type SearchResultsProps = {
  tracks: TrackData[];
  trackButton: TrackButton;
};
function SearchResults({tracks, trackButton}: SearchResultsProps) {

  return (
    <div className={styles.SearchResults}>
      <div className={styles.subhead}>
        <h2>Results</h2>
      </div>
      <Tracklist tracks={tracks} trackButton={trackButton} />
    </div>
  )
}

export default SearchResults;