import { render, screen } from '@testing-library/react';
import SearchResults from './SearchResults';
import '@testing-library/jest-dom';
import React from 'react';

/* eslint-disable no-empty-function, @typescript-eslint/no-empty-function */
describe('SearchResults', () => {
  const mockTracksButton = {
    label: '﹢',
    ariaLabel: 'Add Track',
    callback: () => {},
  };

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

  it('Renders the search results', () => {
    render(
      <SearchResults tracks={mockTrackList} trackButton={mockTracksButton} />
    );

    const track = screen.queryByText(`“Example Track Name”`);
    expect(track).toBeInTheDocument();
  });
});
/* eslint-enable no-empty-function, @typescript-eslint/no-empty-function */
