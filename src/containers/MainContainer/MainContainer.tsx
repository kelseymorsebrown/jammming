import React from 'react';
import styles from './MainContainer.module.css';
import SearchBar from '../../components/SearchBar/SearchBar';
import SearchProvider from '../../context/SearchContext';
import PlaylistProvider from '../../context/PlaylistContext';
import { UserContext } from '../../context/UserContext';
import PlaylistContainer from '../PlaylistContainer/PlaylistContainer';
import SearchResultsContainer from '../SearchResultsContainer/SearchResultsContainer';
import { UserContextType } from '../../utils/types';
import LoginContainer from '../LoginContainer/LoginContainer';

function MainContainer() {
  const { isLoggedIn } = React.useContext(UserContext) as UserContextType;

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
    <main className={styles.main}>
      <LoginContainer />
      {isLoggedIn ? (
        <SearchProvider initialValues={searchResultsInitialValues}>
          <PlaylistProvider initialValues={playlistInitialValues}>
            <SearchBar />
            <div className={styles.ResultsWrapper}>
              <SearchResultsContainer />
              <PlaylistContainer />
            </div>
          </PlaylistProvider>
        </SearchProvider>
      ) : (
        <div />
      )}
    </main>
  );
}
export default MainContainer;
