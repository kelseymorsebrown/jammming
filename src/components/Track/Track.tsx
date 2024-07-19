import React from 'react';
import styles from './Track.module.css';
import { TrackData, TrackButton } from '../../types';

type AppProps = {
  track: TrackData;
  trackButton: TrackButton;
};

function Track({ track, trackButton }: AppProps) {
  const handleClick = () => {
    trackButton.callback(track);
  };

  return (
    <div className={styles.Track} data-testid={`track-${track.id}`}>
      <div className={styles.TrackInfo}>
        <h4>{track.name}</h4>
        <p>
          {track.artists[0].name}, {track.album.name}
        </p>
      </div>
      <div className={styles.TrackButton}>
        <button onClick={handleClick}>{trackButton.label}</button>
      </div>
    </div>
  );
}

export default Track;
