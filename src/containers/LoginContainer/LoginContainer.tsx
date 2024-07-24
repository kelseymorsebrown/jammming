import React, { useEffect } from 'react';
import spotifyAPI from '../../utils/spotifyAPI';
import { UserContext } from '../../context/UserContext';
import { UserContextType } from '../../utils/types';
import styles from './LoginContainer.module.css';

function LoginContainer() {
  const {
    isLoggedIn,
    setIsLoggedIn,
    displayName,
    setDisplayName,
    accessToken,
    setAccessToken,
    expiresAt,
    setExpiresAt,
  } = React.useContext(UserContext) as UserContextType;

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

  /**
   * Obtains parameters from the hash of the URL
   */
  function getQueryParams() {
    type QueryParams = {
      [key: string]: string;
    };

    let queryParams: QueryParams = {};

    let e;
    const r = /([^&;=]+)=?([^&;]*)/g;
    const q = window.location.search.substring(1);

    while ((e = r.exec(q))) {
      queryParams[e[1]] = decodeURIComponent(e[2]);
    }
    return queryParams;
  }

  useEffect(() => {
    const params =
      JSON.stringify(getHashParams()) === '{}'
        ? getQueryParams()
        : getHashParams();
    const access_token = params.access_token;
    const error = params.error;
    const state = params.state;
    const expires_in = Number(params.expires_in);
    const storedState = localStorage.getItem(stateKey);

    if (error) {
      console.log(`There was an error during the authentication: ${error}`);
    } else if (access_token && (state == null || state !== storedState)) {
      console.log('There was an error during the authentication');
    } else if (access_token && expires_in) {
      console.log('Authentication successful');
      setAccessToken(access_token);
      setExpiresAt(getExpiresAt(expires_in));
    }
  }, []);

  useEffect(() => {
    if (accessToken && expiresAt) {
      getDisplayName();
    }
  }, [accessToken, expiresAt]);

  async function getDisplayName() {
    const displayName = await spotifyAPI
      .getUser(stateKey, accessToken)
      .then((jsonResponse) => {
        return jsonResponse.display_name;
      });

    if (displayName) {
      setDisplayName(displayName);
      setIsLoggedIn(true);
    }
  }

  function getExpiresAt(expiresIn: number) {
    return Date.now() + expiresIn * 1000;
  }

  useEffect(() => {
    if (accessToken && expiresAt) {
      const timeRemaining = expiresAt - Date.now();
      const timeout = setTimeout(() => {
        alert('Authentication timeout, please log in again');
        setAccessToken(null);
        setIsLoggedIn(false);
        setExpiresAt(null);
      }, timeRemaining);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [accessToken]);

  if (accessToken && isLoggedIn) {
    localStorage.removeItem(stateKey);
    window.history.pushState({}, document.title, '/');
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
