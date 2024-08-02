import React from 'react';
import styles from './SearchBar.module.css';
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

  const handleSubmit = (event: React.MouseEvent<HTMLInputElement>) => {
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
          type="search"
          name="term"
          id="term"
          placeholder="Search Spotify"
          onChange={handleSearchTermChange}
        />
        <input type="submit" value="Search" onClick={handleSubmit} />
      </form>
    </div>
  );
}

export default SearchBar;
