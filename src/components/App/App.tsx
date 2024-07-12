import React, { useState } from 'react';
import styles from './App.module.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import SearchErrorMessage from '../SearchErrorMessage/SearchErrorMessage';
import Playlist from '../Playlist/Playlist';

// Import Types
import { TrackData } from '../types'


const mockTrack: TrackData = {
  "album": {
    "id": "2up3OPMp9Tb4dAKM2erWXQ",
    "name": "Example Album",
    "type": "album",
    "artists": [
      {
        "id": "string",
        "name": "Example Artist",
        "type": "artist",
      }
    ]
  },
  "artists": [
    {
      "id": "string",
      "name": "Example Artist",
      "type": "artist",
    }
  ],
  "id": "string",
  "name": "Example Track Name",
  "type": "track",
}

const mockTrackList = [
  mockTrack,
  mockTrack,
  mockTrack
]

function App() {

  const [searchResults, setSearchResults] = useState<TrackData[] | null>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [playlistName, setPlaylistName] = useState('');
  const [playlistTracks, setPlaylistTracks] = useState<TrackData[]>([]);

  const handlePlaylistNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setPlaylistName(e.currentTarget.value);

  const searchSpotify = async (searchTerm: string) => {


    if (!searchTerm) {
      setErrorMessage(`Please enter a search term.`);
    } else {
      const tracks = mockTrackList;

      setSearchResults(tracks);
      setPlaylistTracks(tracks);
    }

    if (!searchResults) {
      setErrorMessage(`Something went wrong. Please try again.`)
    }

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
            <SearchResults tracks={searchResults} />
          ) : (
            <SearchErrorMessage errorMessage={errorMessage} />
          )
          }
        </div>
        <div className={styles.colRight}>
          <div className={styles.BufferRow} />
          <Playlist playlistName={playlistName} onChangePlaylistName={handlePlaylistNameChange} tracks={playlistTracks} />
        </div>
        </div>
      </main>
    </div>
  );
}

export default App;
