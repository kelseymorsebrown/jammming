import React, { useState } from 'react';
import styles from './SearchBar.module.css';

type SearchBarProps = {
  searchSpotify: Function;
};
function SearchBar({ searchSpotify }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchTermChange = ( e: React.FormEvent<HTMLInputElement> ) => setSearchTerm(e.currentTarget.value);

  const handleSubmit = (event: React.MouseEvent<HTMLInputElement>) => {
    event.preventDefault();

    searchSpotify(searchTerm);
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
  )
}

export default SearchBar;