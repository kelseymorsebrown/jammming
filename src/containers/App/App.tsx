import React from 'react';
import styles from './App.module.css';
import UserProvider from '../../context/UserContext';
import MainContainer from '../MainContainer/MainContainer';

function App() {
  const userInitialValues = {
    isLoggedIn: false,
    user: null,
    accessToken: null,
    expiresAt: null,
  };

  return (
    <div className={styles.App}>
      <UserProvider initialValues={userInitialValues}>
        <header className={`${styles.header} ${styles.glow} ${styles.metalic}`}>
          <h1>Jammming</h1>
        </header>
        <MainContainer />
      </UserProvider>
      <footer className={`${styles.footer} ${styles.metalic}`}>
        <p>Kelsey Morse-Brown 2024</p>
      </footer>
    </div>
  );
}

export default App;
