import React, { useState, MouseEvent } from 'react';
import styles from './Playlist.module.css';
import { TrackData } from '../types'
import Tracklist from '../Tracklist/Tracklist';

type AppProps = {
  tracks: TrackData[];
};

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
  mockTrack
]

function Playlist() {

  const [playlistName, setPlaylistName] = useState('');
  const handleSearchTermChange = ( e: React.ChangeEvent<HTMLInputElement> ) => setPlaylistName(e.currentTarget.value);

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    // searchSpotify(searchTerm);
  };

  return (
    <div className={styles.Playlist}>
      <input
        type="text"
        name="title"
        id="title"
        placeholder="Your Playlist"
        onChange={handleSearchTermChange}
      />
      <Tracklist tracks={mockTrackList} />
      <button onClick={handleSubmit}>Save To Spotify</button>
    </div>
  )
}

export default Playlist;