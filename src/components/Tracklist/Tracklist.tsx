import React from 'react';
import styles from './Tracklist.module.css';
import Track from '../Track/Track'
import { TrackData } from '../types'

type AppProps = {
  tracks: TrackData[];
};

function Tracklist({ tracks }: AppProps) {

  const trackList = tracks.map((track, i) => {
    return <Track track={track} key={track.name + i} />;
  });

  return <div className={styles.TrackList}>{trackList}</div>
}

export default Tracklist;