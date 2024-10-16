import { waitFor, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import PlaylistContainer from './PlaylistContainer';
import PlaylistProvider from '../../context/PlaylistContext';
import UserProvider from '../../context/UserContext';
import { PlaylistInitialValues, UserInitialValues } from '../../utils/types';
import spotifyAPI from '../../utils/spotifyAPI';
import React from 'react';

/* eslint-disable no-empty-function, @typescript-eslint/no-empty-function */

describe('PlaylistContainer', () => {
  const mockTrackList = [
    {
      album: {
        id: '2up3OPMp9Tb4dAKM2erWXQ',
        name: 'Example Album',
        type: 'album',
        artists: [
          {
            id: '1234ar',
            name: 'Example Artist',
            type: 'artist',
          },
        ],
      },
      artists: [
        {
          id: '1234ar',
          name: 'Example Artist',
          type: 'artist',
        },
      ],
      id: '5678tr',
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
            id: '456892ar',
            name: 'Bartist',
            type: 'artist',
          },
        ],
      },
      artists: [
        {
          id: '456892ar',
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
  const mockPlaylistId = '12345abcd';
  const mockURIs = mockTrackList.map((track) => track.uri);

  const mockUserInit: UserInitialValues = {
    isLoggedIn: true,
    user: {
      displayName: 'testUser',
      id: 'abcd12345',
    },
    accessToken: 'efgh5678',
    expiresAt: null,
  };

  jest.mock('../../utils/spotifyAPI');
  const mockedSpotifyAPI = spotifyAPI as jest.Mocked<typeof spotifyAPI>;
  const createPlaylistSpy = jest.spyOn(spotifyAPI, 'createPlaylist');
  const addTracksSpy = jest.spyOn(spotifyAPI, 'addTracks');

  function renderPlaylistContainer(
    mockPlaylistInit: PlaylistInitialValues,
    mockUserInit: UserInitialValues
  ) {
    render(
      <UserProvider initialValues={mockUserInit}>
        <PlaylistProvider initialValues={mockPlaylistInit}>
          <PlaylistContainer />
        </PlaylistProvider>
      </UserProvider>
    );
  }

  it('updates playlist name with user input', async () => {
    const handleChange = jest.fn();

    const mockPlInit = {
      tracks: [],
      name: '',
    };

    renderPlaylistContainer(mockPlInit, mockUserInit);

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

  describe('handles submitPlaylist', () => {
    beforeEach(() => {
      mockedSpotifyAPI.createPlaylist.mockResolvedValue(mockPlaylistId);
      mockedSpotifyAPI.addTracks.mockResolvedValue('success');
    });

    it('posts to the spotify API when playlist is submitted', async () => {
      const mockPlInit = {
        tracks: mockTrackList,
        name: mockPlaylistName,
      };
      renderPlaylistContainer(mockPlInit, mockUserInit);
      const submitButton = screen.getByTestId('save-playlist-button');

      userEvent.click(submitButton);

      await waitFor(() => {
        expect(createPlaylistSpy).toHaveBeenCalledWith(
          mockUserInit.user?.id,
          mockUserInit.accessToken,
          mockPlaylistName
        );
        expect(addTracksSpy).toHaveBeenCalledWith(
          mockUserInit.accessToken,
          mockPlaylistId,
          mockURIs
        );
      });
    });

    it('clears the playlist name when playlist is submitted', async () => {
      const mockPlInit = {
        tracks: mockTrackList,
        name: mockPlaylistName,
      };
      renderPlaylistContainer(mockPlInit, mockUserInit);
      const submitButton = screen.getByTestId('save-playlist-button');

      expect(screen.getByDisplayValue(mockPlaylistName)).toBeInTheDocument;

      userEvent.click(submitButton);
      await waitFor(() => {
        expect(screen.queryByDisplayValue(mockPlaylistName)).toBeNull();
      });
    });

    it('clears all the playlist tracks when playlist is submitted', async () => {
      const mockPlInit = {
        tracks: mockTrackList,
        name: mockPlaylistName,
      };

      renderPlaylistContainer(mockPlInit, mockUserInit);
      const submitButton = screen.getByTestId('save-playlist-button');

      expect(screen.getByTestId(`track-${mockTrackList[0].id}`))
        .toBeInTheDocument;

      userEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.queryByTestId(`track-${mockTrackList[0].id}`)).toBeNull();
      });
    });
  });
});
/* eslint-enable no-empty-function, @typescript-eslint/no-empty-function */
