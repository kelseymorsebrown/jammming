import { render, screen } from '@testing-library/react';
import SearchResults from './SearchResults';
import '@testing-library/jest-dom';

it('Displays the search results header', async () => {
  render(
    <SearchResults
      tracks={[]}
      trackButton={{
        label: '+',
        callback: () => {},
      }}
      prevButton={{
        label: '⏴',
        callback: () => {},
        id: 'previous-button',
        enabled: false,
      }}
      nextButton={{
        label: '⏵',
        callback: () => {},
        id: 'next-button',
        enabled: false,
      }}
    />
  );

  expect(screen.getByText('Results')).toBeInTheDocument();
});
