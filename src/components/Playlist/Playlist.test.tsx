import { render, screen } from '@testing-library/react';
import Playlist from './Playlist';
import '@testing-library/jest-dom';

it('Displays the playlist submit button', async () => {
  render(
    <Playlist
      playlistName=''
      onChangePlaylistName={() => { }}
      tracks={[]}
      trackButton={{
        label: '-',
        callback: () => {}
      }}
    />
  );

  const playListName = screen.getByText('Save To Spotify');
  expect(playListName).toBeInTheDocument();
})

it('Displays the placeholder playlist name', async () => {
  render(
    <Playlist
      playlistName=''
      onChangePlaylistName={() => { }}
      tracks={[]}
      trackButton={{
        label: '-',
        callback: () => {}
      }}
    />
  );

  const playListName = screen.queryByPlaceholderText(/Your Playlist/i);
  expect(playListName).toBeInTheDocument();
})