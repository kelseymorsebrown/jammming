import React, { createContext, useEffect, useState } from 'react';
import {
  TrackData,
  PlaylistContextType,
  PlaylistInitialValues,
} from '../types';

export const PlaylistContext = createContext<PlaylistContextType | null>(null);

const PlaylistProvider: React.FC<{
  initialValues: PlaylistInitialValues;
  children: React.ReactNode;
}> = ({ initialValues, children }) => {
  const [playlistTracks, setPlaylistTracks] = useState<TrackData[]>(
    initialValues.tracks
  );
  const [playlistName, setPlaylistName] = useState(initialValues.name);
  const [playlistURIs, setPlaylistURIs] = useState<string[]>([]);
  const [hasTracklist, setHasTracklist] = useState(false);

  const addTrack = (track: TrackData) => {
    const trackNotAdded =
      typeof playlistTracks.find((element) => element.id === track.id) ===
      'undefined';

    if (trackNotAdded) {
      setPlaylistTracks((prev) => [...prev, track]);
    }
    return;
  };

  const removeTrack = (track: TrackData) => {
    setPlaylistTracks(
      playlistTracks.filter((element) => element.id !== track.id)
    );

    return;
  };

  useEffect(() => {
    if (!!playlistTracks && playlistTracks.length > 0) {
      setHasTracklist(true);
    } else {
      setHasTracklist(false);
    }
  }, [playlistTracks]);

  useEffect(() => {
    if (playlistURIs.length > 0) {
      console.log(playlistName);
      console.log(playlistURIs);
      console.log('before setPlaylistTracks');
      setPlaylistTracks([]);
      setPlaylistName('');
      console.log('after setPlaylistTracks');
    }
  }, [playlistURIs]);

  return (
    <PlaylistContext.Provider
      value={{
        playlistTracks,
        playlistName,
        playlistURIs,
        hasTracklist,
        addTrack,
        removeTrack,
        setPlaylistName,
        setPlaylistURIs,
      }}
    >
      {children}
    </PlaylistContext.Provider>
  );
};

export default PlaylistProvider;
