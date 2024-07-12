import React from 'react';
import styles from './SearchResults.module.css';
import Tracklist from '../Tracklist/Tracklist';

// Import Types
import { TrackData } from '../types'

type SearchResultsProps = {
  tracks: TrackData[];
};
function SearchResults({tracks}: SearchResultsProps) {

  return (
    <div className={styles.SearchResults}>
      <div className={styles.subhead}>
        <h2>Results</h2>
      </div>
      <Tracklist tracks={tracks} />
    </div>
  )
}

export default SearchResults;