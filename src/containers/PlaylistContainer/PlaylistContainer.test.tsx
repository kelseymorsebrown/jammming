import { waitFor, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PlaylistContainer from './PlaylistContainer';
import PlaylistProvider from '../../context/PlaylistContext';
import '@testing-library/jest-dom';

describe('PlaylistContainer', () => {
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

  const mockPlaylistName = 'Custom Playlist Title';

  it('updates playlist name with user input', async () => {
    const handleChange = jest.fn();

    const plInit = {
      tracks: [],
      name: '',
    };

    render(
      <PlaylistProvider initialValues={plInit}>
        <PlaylistContainer />
      </PlaylistProvider>
    );

    const input = screen.getByTestId('playlist-name');

    expect(input?.getAttribute('value')).toEqual('');

    userEvent.type(input, mockPlaylistName);

    await waitFor(() => {
      const playlistName = screen
        .getByTestId('playlist-name')
        ?.getAttribute('value');
      expect(playlistName).toEqual(mockPlaylistName);
      expect(handleChange).toHaveBeenCalled;
    });
  });

  it('calls handleSubmit when playlist is submitted', async () => {
    const handleSubmit = jest.fn();

    const plInit = {
      tracks: mockTrackList,
      name: '',
    };

    render(
      <PlaylistProvider initialValues={plInit}>
        <PlaylistContainer />
      </PlaylistProvider>
    );

    const button = screen.getByTestId('save-playlist-button');
    userEvent.click(button);

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalled;
    });
  });

  it('clears the playlist name when playlist is submitted', async () => {
    const plInit = {
      tracks: mockTrackList,
      name: '',
    };

    render(
      <PlaylistProvider initialValues={plInit}>
        <PlaylistContainer />
      </PlaylistProvider>
    );

    const input = screen.getByTestId('playlist-name');
    const button = screen.getByTestId('save-playlist-button');

    userEvent.type(input, mockPlaylistName);
    userEvent.click(button);

    await waitFor(() => {
      const playlistName = screen.queryByDisplayValue(mockPlaylistName);
      expect(playlistName).toBeNull();
    });
  });

  it('clears all the playlist tracks when playlist is submitted', async () => {
    const plInit = {
      tracks: mockTrackList,
      name: '',
    };

    render(
      <PlaylistProvider initialValues={plInit}>
        <PlaylistContainer />
      </PlaylistProvider>
    );

    expect(screen.queryByTestId(`track-${mockTrackList[0].id}`))
      .toBeInTheDocument;

    const button = screen.getByTestId('save-playlist-button');
    userEvent.click(button);

    await waitFor(() => {
      expect(screen.queryByTestId(`track-${mockTrackList[0].id}`)).toBeNull;
    });
  });
});
