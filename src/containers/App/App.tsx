import React, { useState } from 'react';
import styles from './App.module.css';
import SearchBar from '../../components/SearchBar/SearchBar';
import SearchResults from '../../components/SearchResults/SearchResults';
import SearchErrorMessage from '../../components/SearchErrorMessage/SearchErrorMessage';
import PlaylistContainer from '../PlaylistContainer/PlaylistContainer';

// Import Types
import { TrackData, TrackButton } from '../../types';

const mockTrack: TrackData = {
  album: {
    id: '2up3OPMp9Tb4dAKM2erWXQ',
    name: 'Example Album',
    type: 'album',
    artists: [
      {
        id: 'string',
        name: 'Example Artist',
        type: 'artist',
      },
    ],
  },
  artists: [
    {
      id: 'string',
      name: 'Example Artist',
      type: 'artist',
    },
  ],
  id: 'string',
  uri: 'spotify:track:string',
  name: 'Example Track Name',
  type: 'track',
};

const mockTrack2: TrackData = {
  album: {
    id: 'abgslw9425ew',
    name: 'Foolbum',
    type: 'album',
    artists: [
      {
        id: 'string',
        name: 'Bartist',
        type: 'artist',
      },
    ],
  },
  artists: [
    {
      id: 'string',
      name: 'Bartist',
      type: 'artist',
    },
  ],
  id: 'abcd',
  uri: 'spotify:track:abcd',
  name: 'Right On',
  type: 'track',
};

const mockTrackList = [mockTrack, mockTrack2];

function App() {
  const [searchResults, setSearchResults] = useState<TrackData[] | null>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [playlistTracks, setPlaylistTracks] = useState<TrackData[]>([]);

  const searchSpotify = async (searchTerm: string) => {
    if (!searchTerm) {
      setErrorMessage(`Please enter a search term.`);
    } else {
      const tracks = mockTrackList;

      setSearchResults(tracks);
    }

    if (!searchResults) {
      setErrorMessage(`Something went wrong. Please try again.`);
    }
  };

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

  const addButton: TrackButton = {
    label: '+',
    callback: addTrack,
  };

  const removeButton: TrackButton = {
    label: '-',
    callback: removeTrack,
  };

  return (
    <div className={styles.App}>
      <header className={styles.header}>
        <h1>Jammming</h1>
      </header>
      <main>
        <SearchBar searchSpotify={searchSpotify} />
        <div className={styles.wrapper}>
          <div className={styles.colLeft}>
            {searchResults ? (
              <SearchResults tracks={searchResults} trackButton={addButton} />
            ) : (
              <SearchErrorMessage errorMessage={errorMessage} />
            )}
          </div>
          <div className={styles.colRight}>
            <div className={styles.BufferRow} />
            <PlaylistContainer
              playlistTracks={playlistTracks}
              setPlaylistTracks={setPlaylistTracks}
              trackButton={removeButton}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
