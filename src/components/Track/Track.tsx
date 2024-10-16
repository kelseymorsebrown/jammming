import React from 'react';
import styles from './Track.module.css';
import mainStyles from '../../containers/MainContainer/MainContainer.module.css';
import { TrackData, TrackButton } from '../../utils/types';

/* eslint-disable no-empty-function, @typescript-eslint/no-empty-function */

type AppProps = {
  track: TrackData;
  trackButton: TrackButton;
};

function Track({ track, trackButton }: AppProps) {
  const handleClick = () => {
    trackButton.callback(track);
  };

  return (
    <div
      className={`${styles.Track} ${
        trackButton.ariaLabel === 'Add Track' ? styles.leftCol : styles.rightCol
      }`}
      data-testid={`track-${track.id}`}
    >
      <div className={styles.TrackInfo}>
        <h4 className={styles.trackName}>&ldquo;{track.name}&rdquo;</h4>
        <div className={styles.artistContainer}>
          <div className={styles.block} />
          <div className={styles.Artist}>
            <div className={styles.leftArrow} />
            <div className={styles.rightArrow} />
            <p>{track.artists[0].name}</p>
          </div>
          <div className={styles.block} />
        </div>
        <p>{track.album.name}</p>
      </div>
      <div className={styles.TrackButton} onClick={handleClick}>
        <button
          className={`${mainStyles.pushable} ${styles.orangeBtn} ${mainStyles.insetGreyBG}`}
          aria-label={trackButton.ariaLabel}
        >
          <span className={`${styles.orangeBtnFront} ${mainStyles.front}`}>
            {trackButton.label}
          </span>
        </button>
      </div>
    </div>
  );
}

export default Track;
/* eslint-enable no-empty-function, @typescript-eslint/no-empty-function */
