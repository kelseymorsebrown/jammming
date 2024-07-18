import React, { useState, useEffect, SetStateAction, Dispatch } from 'react';
import { TrackData, TrackButton } from '../../types';
import Playlist from '../../components/Playlist/Playlist';

type PlaylistContainerProps = {
  playlistTracks: TrackData[];
  setPlaylistTracks: Dispatch<SetStateAction<TrackData[]>>;
  trackButton: TrackButton;
};

function PlaylistContainer({
  playlistTracks,
  setPlaylistTracks,
  trackButton,
}: PlaylistContainerProps) {
  const [playlistName, setPlaylistName] = useState('');
  const [playlistURIs, setPlaylistURIs] = useState<string[]>([]);
  const [hasTracklist, setHasTracklist] = useState(false);

  const handlePlaylistNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPlaylistName(e.currentTarget.value);

  useEffect(() => {
    if (playlistTracks.length > 0) {
      setHasTracklist(true);
    } else {
      setHasTracklist(false);
    }
  }, [playlistTracks]);

  useEffect(() => {
    if (playlistURIs.length > 0) {
      console.log(playlistName);
      console.log(playlistURIs);
      setPlaylistTracks([]);
      setPlaylistName('');
    }
  }, [playlistURIs]);

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const uris = playlistTracks.map((e) => e.uri);
    setPlaylistURIs(uris);

    return;
  };

  return (
    <>
      <Playlist
        playlistName={playlistName}
        onChangePlaylistName={handlePlaylistNameChange}
        onSubmit={handleSubmit}
        hasTracks={hasTracklist}
        tracks={playlistTracks}
        trackButton={trackButton}
      />
    </>
  );
}

export default PlaylistContainer;
