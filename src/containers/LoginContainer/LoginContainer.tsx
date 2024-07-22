import React, { useState } from 'react';
import spotifyAPI from '../../utils/spotifyAPI';
import { UserContext } from '../../context/UserContext';
import { UserContextType } from '../../utils/types';
import styles from './LoginContainer.module.css';

function LoginContainer() {
  const { isLoggedIn, setIsLoggedIn, displayName, setDisplayName } =
    React.useContext(UserContext) as UserContextType;

  const stateKey = 'spotify_auth_state';

  const handleLogin = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    spotifyAPI.logIn(stateKey);
    return;
  };

  /**
   * Obtains parameters from the hash of the URL
   */
  function getHashParams() {
    type HashParams = {
      [key: string]: string;
    };

    let hashParams: HashParams = {};

    let e;
    const r = /([^&;=]+)=?([^&;]*)/g;
    const q = window.location.hash.substring(1);

    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  const params = getHashParams();
  const access_token = params.access_token;
  const state = params.state;
  const storedState = localStorage.getItem(stateKey);

  if (access_token && (state == null || state !== storedState)) {
    alert('There was an error during the authentication');
  } else {
    if (access_token) {
      getDisplayName();
    }
  }

  async function getDisplayName() {
    const displayName = await spotifyAPI
      .getUser(stateKey, access_token)
      .then((jsonResponse) => {
        console.log(jsonResponse.display_name);
        return jsonResponse.display_name;
      });

    if (displayName) {
      setDisplayName(displayName);
      setIsLoggedIn(true);
    }
  }

  if (!displayName && isLoggedIn) {
    localStorage.removeItem(stateKey);
  }

  return (
    <div id="login" className={styles.login}>
      {isLoggedIn ? (
        <p>Logged in as {displayName}</p>
      ) : (
        <button id="login-button" onClick={handleLogin}>
          Log in with Spotify
        </button>
      )}
    </div>
  );
}

export default LoginContainer;
