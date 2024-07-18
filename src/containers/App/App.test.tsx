import { waitFor, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from './App'

test('renders jammming header', () => {
  render(<App />)
  const linkElement = screen.getByText(/Jammming/i)
  expect(linkElement).toBeInTheDocument()
})

// add test to search

// add test to add track to playlist

// add test to remove track from playlist

// add test to rename playlist

/*
it('playlist tracks should clear when submitted', async () => {
  const handleSubmit = jest.fn()
  const setTracks = jest.fn()

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

  render(
    <PlaylistContainer
      setTracks={setTracks}
      tracks={mockTrackList}
      trackButton={{
        label: '-',
        callback: () => {},
      }}
    />
  )

  const button = screen.getByTestId('save-playlist-button')
  userEvent.click(button)

  await waitFor(() => {
    const track1 = screen.queryByText('Example Track Name')
    const track2 = screen.queryByText('Right On')
    const playlistName = screen.queryByDisplayValue('Custom Playlist')
    expect(handleSubmit).toHaveBeenCalled
    expect(track1).toBeNull()
    expect(track2).toBeNull()
    expect(playlistName).toBeNull()
  })
})

*/
