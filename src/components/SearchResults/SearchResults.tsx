import React from 'react';
import styles from './SearchResults.module.css';
import Tracklist from '../Tracklist/Tracklist';

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

function SearchResults() {

  return (
    <div className={styles.SearchResults}>
      <h2>Results</h2>
      <Tracklist tracks={mockTrackList} />
    </div>
  )
}

export default SearchResults;