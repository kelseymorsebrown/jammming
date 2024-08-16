import { render, screen } from '@testing-library/react';
import SearchResults from './SearchResults';
import '@testing-library/jest-dom';

describe('SearchResults', () => {
  const mockTracksButton = {
    label: '+',
    ariaLabel: 'Add Track',
    callback: () => {},
  };

  const mockPrevButton = {
    label: '⏴',
    ariaLabel: 'Previous',
    callback: () => {},
    id: 'previous-button',
    enabled: false,
  };

  const mockNextButton = {
    label: '⏵',
    ariaLabel: 'Next',
    callback: () => {},
    id: 'next-button',
    enabled: false,
  };

  it('Renders the search results header', async () => {
    render(
      <SearchResults
        tracks={[]}
        trackButton={mockTracksButton}
        prevButton={mockPrevButton}
        nextButton={mockNextButton}
      />
    );

    expect(screen.getByText('Results')).toBeInTheDocument();
  });

  it('Renders previous buttons', () => {
    render(
      <SearchResults
        tracks={[]}
        trackButton={mockTracksButton}
        prevButton={{ ...mockPrevButton, enabled: true }}
        nextButton={{ ...mockNextButton, enabled: true }}
      />
    );

    expect(screen.getByLabelText(mockPrevButton.ariaLabel)).toBeInTheDocument();
  });

  it('Renders next button', () => {
    render(
      <SearchResults
        tracks={[]}
        trackButton={mockTracksButton}
        prevButton={{ ...mockPrevButton, enabled: true }}
        nextButton={{ ...mockNextButton, enabled: true }}
      />
    );
    expect(screen.getByLabelText(mockNextButton.ariaLabel)).toBeInTheDocument();
  });

  it('Renders the search results', () => {
    render(
      <SearchResults
        tracks={[]}
        trackButton={mockTracksButton}
        prevButton={mockPrevButton}
        nextButton={mockNextButton}
      />
    );
  });
});
