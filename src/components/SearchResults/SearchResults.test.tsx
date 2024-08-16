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
  it('Displays the search results header', async () => {
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

  it('Renders a disabled previous button when enabled is false', () => {
    render(
      <SearchResults
        tracks={[]}
        trackButton={mockTracksButton}
        prevButton={Object.assign(mockPrevButton, { enabled: false })}
        nextButton={Object.assign(mockNextButton, { enabled: true })}
      />
    );

    expect(screen.getByLabelText(mockPrevButton.ariaLabel)).toBeDisabled();
  });
  it('Renders an enabled previous button when enabled is true', () => {
    render(
      <SearchResults
        tracks={[]}
        trackButton={mockTracksButton}
        prevButton={Object.assign(mockPrevButton, { enabled: true })}
        nextButton={Object.assign(mockNextButton, { enabled: false })}
      />
    );
    expect(screen.getByLabelText(mockPrevButton.ariaLabel)).toBeDisabled();
  });

  it('Renders a disabled next button when enabled is false', () => {
    render(
      <SearchResults
        tracks={[]}
        trackButton={mockTracksButton}
        prevButton={Object.assign(mockPrevButton, { enabled: true })}
        nextButton={Object.assign(mockNextButton, { enabled: false })}
      />
    );
    expect(screen.getByLabelText(mockNextButton.ariaLabel)).toBeDisabled();
  });
  it('Renders an enabled next button when enabled is true', () => {
    render(
      <SearchResults
        tracks={[]}
        trackButton={mockTracksButton}
        prevButton={Object.assign(mockPrevButton, { enabled: false })}
        nextButton={Object.assign(mockNextButton, { enabled: true })}
      />
    );

    expect(screen.getByLabelText(mockNextButton.ariaLabel)).not.toBeDisabled();
  });
});
