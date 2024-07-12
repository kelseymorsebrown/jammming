import { render, screen } from '@testing-library/react';
import SearchResults from './SearchResults';
import '@testing-library/jest-dom';

it('Displays the search results header', async () => {
  render(
    <SearchResults
      tracks={[]}
    />
  );

  expect(screen.getByText('Results')).toBeInTheDocument();
})