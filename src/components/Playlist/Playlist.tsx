import React, { useState, MouseEvent } from 'react';
import styles from './Playlist.module.css';
import { TrackData, TrackButton } from '../types'
import Tracklist from '../Tracklist/Tracklist';

type PlaylistProps = {
  playlistName: string;
  onChangePlaylistName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  tracks: TrackData[];
  trackButton: TrackButton;
};

function Playlist({ playlistName, onChangePlaylistName, tracks, trackButton }: PlaylistProps) {

  const hasTracklist = tracks.length > 0

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    // searchSpotify(searchTerm);
  };

  return (
    <div className={styles.Playlist}>
      <div className={styles.PlaylistName}>
        <input
          type="text"
          name="title"
          id="title"
          value={playlistName}
          placeholder="Your Playlist"
          onChange={onChangePlaylistName}
        />
      </div>
      {hasTracklist ? <Tracklist tracks={tracks} trackButton={trackButton}/> : <div />}
      <button onClick={handleSubmit}>Save To Spotify</button>
    </div>
  )
}

export default Playlist;