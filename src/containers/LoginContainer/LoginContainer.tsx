import React, { useEffect } from 'react';
import spotifyAPI from '../../utils/spotifyAPI';
import { UserContext } from '../../context/UserContext';
import { UserContextType } from '../../utils/types';
import styles from './LoginContainer.module.css';
import { getHashParams, getQueryParams } from '../../utils/parsers';

function LoginContainer() {
  const {
    isLoggedIn,
    setIsLoggedIn,
    user,
    setUser,
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
      console.error(`There was an error during the authentication: ${error}`);
    } else if (access_token && (state == null || state !== storedState)) {
      console.error('There was an error during the authentication');
    } else if (access_token && expires_in) {
      console.log('Authentication successful');
      setAccessToken(access_token);
      setExpiresAt(getExpiresAt(expires_in));
    }
    localStorage.removeItem(stateKey);
    window.history.pushState({}, document.title, '/');
  }, []);

  async function getUserData() {
    const userResponse = await spotifyAPI.getUser(stateKey, accessToken);

    if (userResponse) {
      setUser(userResponse);
      setIsLoggedIn(true);
    }
  }

  function getExpiresAt(expiresIn: number) {
    return Date.now() + expiresIn * 1000;
  }

  useEffect(() => {
    if (accessToken && expiresAt) {
      getUserData();
      const timeRemaining = expiresAt - Date.now();
      const timeout = setTimeout(() => {
        alert('Authentication timeout, please log in again');
        setAccessToken(null);
        setUser(null);
        setIsLoggedIn(false);
        setExpiresAt(null);
      }, timeRemaining);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [accessToken, expiresAt]);

  return (
    <div id="login" className={styles.login}>
      {isLoggedIn ? (
        <p>Logged in as {user?.displayName}</p>
      ) : (
        <button
          id="login-button"
          data-testid="login-button"
          onClick={handleLogin}
        >
          Log in with Spotify
        </button>
      )}
    </div>
  );
}

export default LoginContainer;
