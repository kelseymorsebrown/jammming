import React from 'react';
import {
  TrackButton,
  PlaylistContextType,
  UserContextType,
} from '../../utils/types';
import Playlist from '../../components/Playlist/Playlist';
import { PlaylistContext } from '../../context/PlaylistContext';
import { UserContext } from '../../context/UserContext';
import styles from './PlaylistContainer.module.css';
import spotifyAPI from '../../utils/spotifyAPI';

function PlaylistContainer() {
  const {
    playlistTracks,
    setPlaylistTracks,
    playlistName,
    setPlaylistName,
    hasTracklist,
    removeTrack,
  } = React.useContext(PlaylistContext) as PlaylistContextType;

  const { user, accessToken } = React.useContext(
    UserContext
  ) as UserContextType;

  const handlePlaylistNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPlaylistName(e.currentTarget.value);

  const removeButton: TrackButton = {
    label: '-',
    ariaLabel: 'Remove Track',
    callback: removeTrack,
  };

  const submitPlaylist = async (userId: string, trackURIs: string[]) => {
    try {
      const playlistId = await spotifyAPI.createPlaylist(
        userId,
        accessToken,
        playlistName
      );
      const result = await spotifyAPI.addTracks(
        accessToken,
        playlistId,
        trackURIs
      );

      if (result === 'success') {
        alert(
          `Your play list "${playlistName}" has been successfully saved to your Spotify account ${user?.displayName}`
        );
        setPlaylistTracks([]);
        setPlaylistName('');
      }
    } catch (err) {
      console.error(err);
    }
    return;
  };

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const uris = playlistTracks.map((e) => e.uri);
    if (user) {
      submitPlaylist(user.id, uris);
    }
    return;
  };

  return (
    <div className={styles.colRight}>
      <div className={styles.BufferRow} />
      <Playlist
        playlistName={playlistName}
        onChangePlaylistName={handlePlaylistNameChange}
        onSubmit={handleSubmit}
        hasTracks={hasTracklist}
        tracks={playlistTracks}
        trackButton={removeButton}
      />
    </div>
  );
}

export default PlaylistContainer;
