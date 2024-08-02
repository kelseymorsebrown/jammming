import React, { useState, MouseEvent } from 'react';
import styles from './Playlist.module.css';
import { TrackData, TrackButton } from '../../utils/types';
import Tracklist from '../Tracklist/Tracklist';

type PlaylistProps = {
  playlistName: string;
  onChangePlaylistName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: React.MouseEvent<HTMLButtonElement>) => void;
  hasTracks: Boolean;
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
      <div className={styles.PlaylistName}>
        <input
          type="text"
          name="title"
          id="title"
          data-testid="playlist-name"
          value={playlistName}
          placeholder="Your Playlist"
          onChange={onChangePlaylistName}
        />
      </div>
      {hasTracks ? (
        <Tracklist tracks={tracks} trackButton={trackButton} />
      ) : (
        <div />
      )}
      <button onClick={onSubmit} data-testid="save-playlist-button">
        Save To Spotify
      </button>
    </div>
  );
}

export default Playlist;
