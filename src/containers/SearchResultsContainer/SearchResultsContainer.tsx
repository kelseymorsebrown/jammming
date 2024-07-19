import React from 'react';
import SearchResults from '../../components/SearchResults/SearchResults';
import SearchErrorMessage from '../../components/SearchErrorMessage/SearchErrorMessage';
import { SearchContext } from '../../context/SearchContext';
import { PlaylistContext } from '../../context/PlaylistContext';
import styles from './SearchResultsContainer.module.css';

// Import Types
import {
  TrackButton,
  SearchContextType,
  PlaylistContextType,
} from '../../types';

function SearchResultsContainer() {
  const { errorMessage, searchResults } = React.useContext(
    SearchContext
  ) as SearchContextType;

  const { addTrack } = React.useContext(PlaylistContext) as PlaylistContextType;

  const addButton: TrackButton = {
    label: '+',
    callback: addTrack,
  };

  return (
    <div className={styles.colLeft}>
      {searchResults ? (
        <SearchResults tracks={searchResults} trackButton={addButton} />
      ) : (
        <SearchErrorMessage errorMessage={errorMessage} />
      )}
    </div>
  );
}

export default SearchResultsContainer;
