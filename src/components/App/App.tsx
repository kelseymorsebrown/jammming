import React, {useState} from 'react';
import styles from './App.module.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import SearchErrorMessage from '../SearchErrorMessage/SearchErrorMessage';
import Playlist from '../Playlist/Playlist';

// Import Types
import { TrackData } from '../types'


const mockTrack = {
  "album": {
    "href": "string",
    "id": "2up3OPMp9Tb4dAKM2erWXQ",
    "name": "Example Album",
    "type": "album",
    "uri": "spotify:album:2up3OPMp9Tb4dAKM2erWXQ",
    "artists": [
      {
        "href": "string",
        "id": "string",
        "name": "Example Artist",
        "type": "artist",
        "uri": "string"
      }
    ]
  },
  "artists": [
    {
      "href": "string",
      "id": "string",
      "name": "Example Artist",
      "type": "artist",
      "uri": "string"
    }
  ],
  "href": "string",
  "id": "string",
  "name": "Example Track Name",
  "type": "track",
  "uri": "string"
}

const mockTrackList = [
  mockTrack,
  mockTrack,
  mockTrack
]

function App() {
  const [searchResults, setSearchResults] = useState<TrackData[] | null>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  const searchSpotify = async (searchTerm: string) => {


    if (!searchTerm) {
      setErrorMessage(`Please enter a search term.`);
    } else {
      const tracks = mockTrackList;

      setSearchResults(tracks);
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
      <main className={styles.wrapper}>
          <div className={styles.colLeft}>
          <SearchBar searchSpotify={searchSpotify} />
          {searchResults ? (
            <SearchResults tracks={searchResults} />
          ) : (
            <SearchErrorMessage errorMessage={errorMessage} />
          )
          }
          
          </div>
          <div className={styles.colRight}>
            <Playlist />
          </div>
      </main>
    </div>
  );
}

export default App;
