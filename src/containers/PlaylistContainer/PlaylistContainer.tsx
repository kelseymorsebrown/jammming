import React from 'react';
import { TrackButton, PlaylistContextType } from '../../utils/types';
import Playlist from '../../components/Playlist/Playlist';
import styles from './PlaylistContainer.module.css';
import { PlaylistContext } from '../../context/PlaylistContext';

function PlaylistContainer() {
  const {
    playlistTracks,
    playlistName,
    setPlaylistName,
    hasTracklist,
    removeTrack,
    setPlaylistURIs,
  } = React.useContext(PlaylistContext) as PlaylistContextType;

  const handlePlaylistNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPlaylistName(e.currentTarget.value);

  const removeButton: TrackButton = {
    label: '-',
    callback: removeTrack,
  };

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const uris = playlistTracks.map((e) => e.uri);
    setPlaylistURIs(uris);

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
