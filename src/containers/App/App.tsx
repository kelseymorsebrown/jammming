import React from 'react';
import styles from './App.module.css';
import SearchBar from '../../components/SearchBar/SearchBar';
import PlaylistContainer from '../PlaylistContainer/PlaylistContainer';
import SearchResultsContainer from '../SearchResultsContainer/SearchResultsContainer';
import SearchProvider from '../../context/SearchContext';
import PlaylistProvider from '../../context/PlaylistContext';

function App() {
  const searchResultsInitialValues = {
    results: null,
    term: '',
    err: null,
  };

  const playlistInitialValues = {
    tracks: [],
    name: '',
  };

  return (
    <div className={styles.App}>
      <header className={styles.header}>
        <h1>Jammming</h1>
      </header>
      <main>
        <SearchProvider initialValues={searchResultsInitialValues}>
          <PlaylistProvider initialValues={playlistInitialValues}>
            <SearchBar />
            <div className={styles.wrapper}>
              <SearchResultsContainer />
              <PlaylistContainer />
            </div>
          </PlaylistProvider>
        </SearchProvider>
      </main>
    </div>
  );
}

export default App;
