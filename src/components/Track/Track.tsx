import React from 'react';
import styles from './Track.module.css';
import { TrackData } from '../types'

type AppProps = {
  track: TrackData;
};

function Track({ track }: AppProps) {

  return (
    <div className={styles.Track}>
      <p>{track.name}</p>
    </div>
  )
}

export default Track;