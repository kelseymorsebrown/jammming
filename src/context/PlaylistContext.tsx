import React, { createContext, useEffect, useState } from 'react';
import {
  TrackData,
  PlaylistContextType,
  PlaylistInitialValues,
} from '../utils/types';

export const PlaylistContext = createContext<PlaylistContextType | null>(null);

const PlaylistProvider: React.FC<{
  initialValues: PlaylistInitialValues;
  children: React.ReactNode;
}> = ({ initialValues, children }) => {
  const [playlistTracks, setPlaylistTracks] = useState<TrackData[]>(
    initialValues.tracks
  );
  const [playlistName, setPlaylistName] = useState(initialValues.name);
  const [hasTracklist, setHasTracklist] = useState(false);
  const [hasValidPlaylist, setHasValidPlaylist] = useState(false);

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
    if (hasTracklist && !!playlistName && playlistName.length > 0) {
      setHasValidPlaylist(true);
    } else {
      setHasValidPlaylist(false);
    }
  }, [hasTracklist, playlistName]);

  return (
    <PlaylistContext.Provider
      value={{
        playlistTracks,
        playlistName,
        hasTracklist,
        hasValidPlaylist,
        addTrack,
        removeTrack,
        setPlaylistName,
        setPlaylistTracks,
      }}
    >
      {children}
    </PlaylistContext.Provider>
  );
};

export default PlaylistProvider;
