import React from 'react';
import styles from './App.module.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';

function App() {
  return (
    <div className={styles.App}>
      <header className={styles.header}>
        <h1>Jammming</h1>
      </header>
      <main className={styles.wrapper}>
          <div className={styles.colLeft}>
          <SearchBar />
          <SearchResults />
          </div>
          <div className={styles.colRight}>

          </div>
      </main>
    </div>
  );
}

export default App;
