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

  it('Renders enabled previous buttons when enabled is true', () => {
    render(
      <SearchResults
        tracks={[]}
        trackButton={mockTracksButton}
        prevButton={{ ...mockPrevButton, enabled: true }}
        nextButton={{ ...mockNextButton, enabled: false }}
      />
    );

    expect(screen.getByLabelText(mockPrevButton.ariaLabel)).not.toBeDisabled();
  });

  it('Renders disabled previous button when enabled is false', () => {
    render(
      <SearchResults
        tracks={[]}
        trackButton={mockTracksButton}
        prevButton={{ ...mockPrevButton, enabled: false }}
        nextButton={{ ...mockNextButton, enabled: true }}
      />
    );

    expect(screen.getByLabelText(mockPrevButton.ariaLabel)).toBeDisabled();
  });

  it('Renders enabled next button when enabled is true', () => {
    render(
      <SearchResults
        tracks={[]}
        trackButton={mockTracksButton}
        prevButton={{ ...mockPrevButton, enabled: false }}
        nextButton={{ ...mockNextButton, enabled: true }}
      />
    );
    expect(screen.getByLabelText(mockNextButton.ariaLabel)).not.toBeDisabled();
  });

  it('Renders disabled next button when enabled is false', () => {
    render(
      <SearchResults
        tracks={[]}
        trackButton={mockTracksButton}
        prevButton={{ ...mockPrevButton, enabled: true }}
        nextButton={{ ...mockNextButton, enabled: false }}
      />
    );
    expect(screen.getByLabelText(mockNextButton.ariaLabel)).toBeDisabled();
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
