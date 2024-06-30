import React from 'react';
import styles from './SearchResults.module.css';
import Tracklist from '../Tracklist/Tracklist';

const mockTrack = {
  "album": {
    "href": "string",
    "id": "2up3OPMp9Tb4dAKM2erWXQ",
    "images": [
      {
        "url": "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
        "height": 300,
        "width": 300
      }
    ],
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
      "genres": [
        "Prog rock",
        "Grunge"
      ],
      "href": "string",
      "id": "string",
      "images": [
        {
          "url": "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
          "height": 300,
          "width": 300
        }
      ],
      "name": "Example Artist",
      "type": "artist",
      "uri": "string"
    }
  ],
  "disc_number": 0,
  "duration_ms": 0,
  "explicit": false,
  "href": "string",
  "id": "string",
  "is_playable": false,
  "name": "Example Track Name",
  "popularity": 0,
  "preview_url": "string",
  "track_number": 0,
  "type": "track",
  "uri": "string",
  "is_local": false
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