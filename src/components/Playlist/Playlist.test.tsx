import { render, screen } from '@testing-library/react';
import Playlist from './Playlist';
import '@testing-library/jest-dom';
import React from 'react';

/* eslint-disable no-empty-function, @typescript-eslint/no-empty-function */
it('Displays the playlist submit button', async () => {
  render(
    <Playlist
      playlistName=""
      onChangePlaylistName={() => {}}
      onSubmit={() => {}}
      hasTracks={false}
      tracks={[]}
      trackButton={{
        label: '﹣',
        ariaLabel: 'Remove Track',
        callback: () => {},
      }}
      hasValidPlaylist={false}
    />
  );

  const submitButton = screen.getByTestId('save-playlist-button');
  expect(submitButton).toBeInTheDocument();
});

it('Displays the placeholder playlist name when no playlist name', async () => {
  render(
    <Playlist
      playlistName=""
      onChangePlaylistName={() => {}}
      onSubmit={() => {}}
      hasTracks={false}
      tracks={[]}
      trackButton={{
        label: '﹣',
        ariaLabel: 'Remove Track',
        callback: () => {},
      }}
      hasValidPlaylist={false}
    />
  );

  const playlistName = screen.queryByTestId('playlist-name');
  expect(playlistName?.getAttribute('value')).toEqual('');
  expect(playlistName?.getAttribute('placeholder')).toEqual(
    'Click to Name Your Playlist'
  );
});

it('Displays the playlist name when it exists', async () => {
  render(
    <Playlist
      playlistName="My Playlist"
      onChangePlaylistName={() => {}}
      onSubmit={() => {}}
      hasTracks={false}
      tracks={[]}
      trackButton={{
        label: '﹣',
        ariaLabel: 'Remove Track',
        callback: () => {},
      }}
      hasValidPlaylist={false}
    />
  );

  const playlistName = screen.queryByDisplayValue('My Playlist');
  expect(playlistName).toBeInTheDocument();
});

it('Renders tracks when hasTracks is true', async () => {
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
  ];

  render(
    <Playlist
      playlistName=""
      onChangePlaylistName={() => {}}
      onSubmit={() => {}}
      hasTracks={true}
      tracks={mockTrackList}
      trackButton={{
        label: '﹣',
        ariaLabel: 'Remove Track',
        callback: () => {},
      }}
      hasValidPlaylist={false}
    />
  );

  const track = screen.queryByText(`“Example Track Name”`);
  expect(track).toBeInTheDocument();
});

it('Renders no tracks when hasTracks is false', async () => {
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
  ];

  render(
    <Playlist
      playlistName=""
      onChangePlaylistName={() => {}}
      onSubmit={() => {}}
      hasTracks={false}
      tracks={mockTrackList}
      trackButton={{
        label: '﹣',
        ariaLabel: 'Remove Track',
        callback: () => {},
      }}
      hasValidPlaylist={false}
    />
  );

  const track = screen.queryByText('Example Track Name');

  expect(track).toBeNull();
});

it('Renders disabled submit button hasValidPlaylist is false', async () => {
  render(
    <Playlist
      playlistName=""
      onChangePlaylistName={() => {}}
      onSubmit={() => {}}
      hasTracks={false}
      tracks={[]}
      trackButton={{
        label: '﹣',
        ariaLabel: 'Remove Track',
        callback: () => {},
      }}
      hasValidPlaylist={false}
    />
  );
  const submitButton = screen.getByTestId('save-playlist-button');
  expect(submitButton).toBeDisabled();
});

it('Renders enabled submit button hasValidPlaylist is true', async () => {
  render(
    <Playlist
      playlistName=""
      onChangePlaylistName={() => {}}
      onSubmit={() => {}}
      hasTracks={false}
      tracks={[]}
      trackButton={{
        label: '﹣',
        ariaLabel: 'Remove Track',
        callback: () => {},
      }}
      hasValidPlaylist={true}
    />
  );
  const submitButton = screen.getByTestId('save-playlist-button');
  expect(submitButton).not.toBeDisabled();
});

/* eslint-enable no-empty-function, @typescript-eslint/no-empty-function */
