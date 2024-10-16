import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Track from './Track';
import React from 'react';

/* eslint-disable no-empty-function, @typescript-eslint/no-empty-function */

const mockTrack = {
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
  id: 'string',
  uri: 'spotify:track:string',
  name: 'Right On',
  type: 'track',
};

it('Displays the track name', async () => {
  render(
    <Track
      track={mockTrack}
      trackButton={{
        label: '﹢',
        ariaLabel: 'Add Track',
        callback: () => {},
      }}
    />
  );

  expect(screen.getByText(`“Right On”`)).toBeInTheDocument();
});

it('Displays the artist', async () => {
  render(
    <Track
      track={mockTrack}
      trackButton={{
        label: '﹢',
        ariaLabel: 'Add Track',
        callback: () => {},
      }}
    />
  );

  expect(screen.getByText('Bartist')).toBeInTheDocument();
});

it('should call the callback function when clicked', async () => {
  const handleClick = jest.fn();

  render(
    <Track
      track={mockTrack}
      trackButton={{
        label: '﹢',
        ariaLabel: 'Add Track',
        callback: handleClick,
      }}
    />
  );

  const button = screen.getByRole('button');

  await userEvent.click(button);

  expect(handleClick).toHaveBeenCalledTimes(1);
  expect(handleClick).toHaveBeenCalledWith(mockTrack);
});
/* eslint-enable no-empty-function, @typescript-eslint/no-empty-function */
