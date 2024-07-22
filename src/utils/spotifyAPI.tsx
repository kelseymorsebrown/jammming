import { CLIENT_ID, REDIRECT_URI } from './consts';

/**
 * Generates a random string containing numbers and letters
 */
function generateRandomString(length: number): string {
  var text = '';
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
const spotifyAPI = {
  logIn(stateKey: string) {
    const state = generateRandomString(16);

    localStorage.setItem(stateKey, state);

    const scope = 'user-read-private user-read-email';

    let url = 'https://accounts.spotify.com/authorize';
    url += '?response_type=token';
    if (CLIENT_ID) {
      url += '&client_id=' + encodeURIComponent(CLIENT_ID);
    }
    url += '&scope=' + encodeURIComponent(scope);
    url += '&redirect_uri=' + encodeURIComponent(REDIRECT_URI);
    url += '&state=' + encodeURIComponent(state);
    url += '&show_dialog=true';

    window.location.assign(url);
  },
  async getUser(stateKey: string, access_token: string) {
    return fetch('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: 'Bearer ' + access_token,
      },
    }).then((response) => {
      if (!response.ok) {
        return response.json().then((errorResponse) => {
          console.error('API error:', errorResponse);
          throw new Error('API error');
        });
      }
      return response.json();
    });
  },
};

export default spotifyAPI;
