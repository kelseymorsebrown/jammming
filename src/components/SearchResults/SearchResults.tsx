import React from 'react';
import styles from './SearchResults.module.css';
import Tracklist from '../Tracklist/Tracklist';

// Import Types
import { TrackData } from '../types'

type AppProps = {
  tracks: TrackData[];
};
function SearchResults({tracks}: AppProps) {

  return (
    <div className={styles.SearchResults}>
      <h2>Results</h2>
      <Tracklist tracks={tracks} />
    </div>
  )
}

export default SearchResults;