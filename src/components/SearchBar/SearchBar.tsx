import React from 'react';
import styles from './SearchBar.module.css';
import mainStyles from '../../containers/MainContainer/MainContainer.module.css';
import { SearchContext } from '../../context/SearchContext';
import { SearchContextType, UserContextType } from '../../utils/types';
import { UserContext } from '../../context/UserContext';

function SearchBar() {
  const {
    searchTerm,
    setSearchTerm,
    setSearchResults,
    setErrorMessage,
    constructSearchParamsFromQuery,
    searchSpotify,
  } = React.useContext(SearchContext) as SearchContextType;

  const { accessToken } = React.useContext(UserContext) as UserContextType;

  const handleSearchTermChange = (e: React.FormEvent<HTMLInputElement>) =>
    setSearchTerm(e.currentTarget.value);

  const handleSubmit = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    if (searchTerm === '') {
      setErrorMessage(`Please enter a search term.`);
      setSearchResults(null);
      return;
    }

    const encodedQueryParams: string =
      constructSearchParamsFromQuery(searchTerm);

    searchSpotify(encodedQueryParams, accessToken);
  };

  return (
    <div className={styles.SearchBar}>
      <form>
        <input
          className={mainStyles.insetBrownBG}
          type="search"
          name="term"
          id="term"
          placeholder="Search Spotify"
          onChange={handleSearchTermChange}
          data-testid="search-input"
          value={searchTerm}
        />
        <button
          type="submit"
          data-testid="search-button"
          onClick={handleSubmit}
          className={`${mainStyles.pushable} ${mainStyles.yellowBtn} ${mainStyles.insetBrownBG}`}
        >
          <span className={mainStyles.front}>Search</span>
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
