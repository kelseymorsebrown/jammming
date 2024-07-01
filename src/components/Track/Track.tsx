import React from 'react';
import styles from './Track.module.css';
import { TrackData } from '../types'

type AppProps = {
  track: TrackData;
};

function Track({ track }: AppProps) {

  return (
    <div className={styles.Track}>
      <h4>{track.name}</h4>
      <p>{track.artists[0].name}, {track.album.name}</p>
    </div>
  )
}

export default Track;