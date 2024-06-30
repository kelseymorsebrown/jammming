import React, { useState } from 'react';
import styles from './SearchBar.module.css';

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchTermChange = ( e: React.FormEvent<HTMLInputElement> ) => setSearchTerm(e.currentTarget.value);

  const handleSubmit = (event: React.MouseEvent<HTMLInputElement>) => {
    event.preventDefault();

    // searchSpotify(searchTerm);
  };

  return (
    <form className={styles.SearchBar}>
      <input
        type="search"
        name="term"
        id="term"
        placeholder="Search Spotify"
        onChange={handleSearchTermChange}
      />
      <input type="submit" value="Search" onClick={handleSubmit} />
    </form>
  )
}

export default SearchBar;