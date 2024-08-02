import React from 'react';
import styles from './Tracklist.module.css';
import Track from '../Track/Track';
import { TrackData, TrackButton } from '../../utils/types';

type TracklistProps = {
  tracks: TrackData[];
  trackButton: TrackButton;
};

function Tracklist({ tracks, trackButton }: TracklistProps) {
  const trackList = tracks.map((track, i) => {
    return <Track track={track} key={track.id + i} trackButton={trackButton} />;
  });

  return <div className={styles.TrackList}>{trackList}</div>;
}

export default Tracklist;
