import React from 'react';
import styles from './Playlist.module.css';
import mainStyles from '../../containers/MainContainer/MainContainer.module.css';
import { TrackData, TrackButton } from '../../utils/types';
import Tracklist from '../Tracklist/Tracklist';

type PlaylistProps = {
  playlistName: string;
  onChangePlaylistName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: React.MouseEvent<HTMLButtonElement>) => void;
  hasTracks: boolean;
  tracks: TrackData[];
  trackButton: TrackButton;
};

function Playlist({
  playlistName,
  onChangePlaylistName,
  onSubmit,
  hasTracks,
  tracks,
  trackButton,
}: PlaylistProps) {
  return (
    <div className={styles.Playlist}>
      <div className={styles.PlaylistSubhead}>
        <div className={`${mainStyles.insetBox} ${mainStyles.subheader}`}>
          <h2>
            <input
              className={styles.PlaylistName}
              type="text"
              name="title"
              id="title"
              data-testid="playlist-name"
              value={playlistName}
              placeholder="Your Playlist"
              onChange={onChangePlaylistName}
            />
          </h2>
        </div>
        <button
          className={`${mainStyles.pushable} ${mainStyles.yellowBtn} ${mainStyles.insetGreyBG}`}
          onClick={onSubmit}
          data-testid="save-playlist-button"
        >
          <span className={mainStyles.front}>Save To Spotify</span>
        </button>
      </div>
      {hasTracks ? (
        <Tracklist tracks={tracks} trackButton={trackButton} />
      ) : (
        <div />
      )}
    </div>
  );
}

export default Playlist;
