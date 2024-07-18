import { waitFor, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PlaylistContainer from './PlaylistContainer'
import '@testing-library/jest-dom'

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
]

const mockPlaylistName = 'Custom Playlist Title'

it('playlist name should update with user input', async () => {
  const handleChange = jest.fn()

  render(
    <PlaylistContainer
      setPlaylistTracks={() => {}}
      playlistTracks={[]}
      trackButton={{
        label: '-',
        callback: () => {},
      }}
    />
  )

  const input = screen.getByTestId('playlist-name')

  expect(input?.getAttribute('value')).toEqual('')

  userEvent.type(input, mockPlaylistName)

  await waitFor(() => {
    const playlistName = screen
      .getByTestId('playlist-name')
      ?.getAttribute('value')
    expect(playlistName).toEqual(mockPlaylistName)
    expect(handleChange).toHaveBeenCalled
  })
})

it('handleSubmit is called when playlist is submitted', async () => {
  const handleSubmit = jest.fn()

  render(
    <PlaylistContainer
      setPlaylistTracks={() => {}}
      playlistTracks={mockTrackList}
      trackButton={{
        label: '-',
        callback: () => {},
      }}
    />
  )

  const button = screen.getByTestId('save-playlist-button')
  userEvent.click(button)

  await waitFor(() => {
    expect(handleSubmit).toHaveBeenCalled
  })
})

it('playlist name clears when playlist is submitted', async () => {
  render(
    <PlaylistContainer
      setPlaylistTracks={() => {}}
      playlistTracks={mockTrackList}
      trackButton={{
        label: '-',
        callback: () => {},
      }}
    />
  )

  const input = screen.getByTestId('playlist-name')
  const button = screen.getByTestId('save-playlist-button')

  userEvent.type(input, mockPlaylistName)
  userEvent.click(button)

  await waitFor(() => {
    const playlistName = screen.queryByDisplayValue(mockPlaylistName)
    expect(playlistName).toBeNull()
  })
})

it('setPlaylistTracks is called with empty array when playlist is submitted', async () => {
  const setPlaylistTracks = jest.fn()

  render(
    <PlaylistContainer
      setPlaylistTracks={setPlaylistTracks}
      playlistTracks={mockTrackList}
      trackButton={{
        label: '-',
        callback: () => {},
      }}
    />
  )

  const button = screen.getByTestId('save-playlist-button')
  userEvent.click(button)

  await waitFor(() => {
    expect(setPlaylistTracks).toHaveBeenCalledWith([])
  })
})
