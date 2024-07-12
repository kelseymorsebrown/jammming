import React from 'react';
import styles from './Tracklist.module.css';
import Track from '../Track/Track'
import { TrackData } from '../types'

type TracklistProps = {
  tracks: TrackData[];
};

function Tracklist({ tracks }: TracklistProps) {
  const trackList = tracks.map((track, i) => {
    return <Track track={track} key={track.id + i} />;
  });

  return <div className={styles.TrackList}>{trackList}</div>

}

export default Tracklist;