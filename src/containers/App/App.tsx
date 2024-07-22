import React, { useState } from 'react';
import styles from './App.module.css';
import SearchBar from '../../components/SearchBar/SearchBar';
import SearchProvider from '../../context/SearchContext';
import PlaylistProvider from '../../context/PlaylistContext';
import UserProvider from '../../context/UserContext';
import LoginContainer from '../LoginContainer/LoginContainer';
import PlaylistContainer from '../PlaylistContainer/PlaylistContainer';
import SearchResultsContainer from '../SearchResultsContainer/SearchResultsContainer';

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

  const userInitialValues = {
    isLoggedIn: false,
    displayName: null,
    accessToken: null,
    expiresAt: null,
  };

  return (
    <div className={styles.App}>
      <UserProvider initialValues={userInitialValues}>
        <header className={styles.header}>
          <h1>Jammming</h1>
          <LoginContainer />
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
      </UserProvider>
    </div>
  );
}

export default App;
