import { json } from 'stream/consumers';
import { CLIENT_ID, REDIRECT_URI } from './consts';
import { TrackData, Artist, Album } from './types';

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
  getUser(stateKey: string, accessToken: string | null) {
    return fetch('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorResponse) => {
            console.error('API error: ', errorResponse);
            throw new Error('API error');
          });
        }
        return response.json();
      })
      .then((jsonResponse) => {
        return {
          displayName: jsonResponse.display_name,
          id: jsonResponse.id,
        };
      });
  },
  getSearchEndpoint(query: string) {
    return `https://api.spotify.com/v1/search?${query}`;
  },
  getTracks(endpoint: string, accessToken: string | null) {
    console.log(`Client: ${CLIENT_ID}`);

    return fetch(endpoint, {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorResponse) => {
            console.error('API error: ', errorResponse);
            throw new Error('API error');
          });
        }
        return response.json();
      })
      .then((jsonResponse) => {
        let trackList: TrackData[] = [];

        // The total number of items available to return.
        const total: number = jsonResponse.tracks.total;

        // URL to the next page of items ( null if none)
        const next: string | null = jsonResponse.tracks.next;

        // URL to the previous page of items (null if none)
        const previous: string | null = jsonResponse.tracks.previous;

        if (jsonResponse.tracks.items) {
          trackList = jsonResponse.tracks.items.map((track: TrackData) => {
            function getSimplifiedArtists(artists: Artist[]) {
              return artists.map((artist) => {
                return {
                  name: artist.name,
                  id: artist.id,
                };
              });
            }

            function getSimplifiedAlbums(album: Album) {
              return {
                name: album.name,
                artists: getSimplifiedArtists(album.artists),
                id: album.id,
              };
            }

            return {
              name: track.name,
              artists: getSimplifiedArtists(track.artists),
              album: getSimplifiedAlbums(track.album),
              id: track.id,
              uri: track.uri,
            };
          });
        } else {
          console.log('No tracks found.');
        }

        return {
          trackList,
          total,
          next,
          previous,
        };
      })
      .catch((error) => {
        console.error('Error fetching and parsing data', error);
      });
  },
};

export default spotifyAPI;
