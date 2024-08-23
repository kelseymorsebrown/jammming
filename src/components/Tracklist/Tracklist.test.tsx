import { render, screen } from '@testing-library/react';
import Tracklist from './Tracklist';
import '@testing-library/jest-dom';

const mockTrackList = [
  {
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
  },
  {
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
  },
];

it('Displays the first track', async () => {
  render(
    <Tracklist
      tracks={mockTrackList}
      trackButton={{
        label: '-',
        ariaLabel: 'Remove Track',
        callback: () => {},
      }}
    />
  );

  expect(screen.getByText('Example Track Name')).toBeInTheDocument();
});
it('Displays the second track', async () => {
  render(
    <Tracklist
      tracks={mockTrackList}
      trackButton={{
        label: '-',
        ariaLabel: 'Remove Track',
        callback: () => {},
      }}
    />
  );

  expect(screen.getByText('Right On')).toBeInTheDocument();
});
