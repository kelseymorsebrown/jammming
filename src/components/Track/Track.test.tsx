import { render, screen } from '@testing-library/react';
import Track from './Track';
import '@testing-library/jest-dom';

const mockTrack = {
    "album": {
      "id": "abgslw9425ew",
      "name": "Foolbum",
      "type": "album",
      "artists": [
        {
          "id": "string",
          "name": "Bartist",
          "type": "artist",
        }
      ]
    },
    "artists": [
      {
        "id": "string",
        "name": "Bartist",
        "type": "artist",
      }
    ],
    "id": "string",
    "name": "Right On",
    "type": "track",
}
  
it('Displays the track name', async () => {
  render(
    <Track
      track={mockTrack}
      trackButton={{
        label: '+',
        callback: () => {}
      }}
    />
  );

  expect(screen.getByText('Right On')).toBeInTheDocument();
})

it('Displays the album name and artist', async () => {
  render(
    <Track
      track={mockTrack}
      trackButton={{
        label: '+',
        callback: () => {}
      }}
    />
  );

  expect(screen.getByText('Bartist, Foolbum')).toBeInTheDocument();
})