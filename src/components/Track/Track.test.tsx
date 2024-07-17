import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Track from './Track';

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

it('should call the callback function when clicked', async () => {
  const handleClick = jest.fn();
  
  render(
    <Track
      track={mockTrack}
      trackButton={{
        label: '+',
        callback: handleClick
      }}
    />
  );

  const button = screen.getByRole("button");

  await userEvent.click(button);

  expect(handleClick).toHaveBeenCalledTimes(1);
  expect(handleClick).toHaveBeenCalledWith(mockTrack);

})