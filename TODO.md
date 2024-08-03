# Next Step

Save a User's Playlist

Create a method that writes the user’s custom playlist in Jammming to their Spotify account. The user should be able to save their custom playlist from Jammming into their account when they click the “Save To Spotify” button.

To implement this feature, you will need to make requests to create new playlists on the user’s Spotify account with the playlist’s custom name and add the tracks from the user’s custom playlist to the new playlist.

- To hit the necessary endpoints, you’ll need the user’s ID, you can make a request that returns the user’s Spotify username by making a request to `https://api.spotify.com/v1/me`.
- To create a new playlist, you will need to make a POST request to the `/v1/users/{user_id}/playlists` endpoint. You can set the name and description of the new playlist in the request body.
- To add tracks to the new playlist, you will need to make a POST request to the `//v1/users/{user_id}/playlists/{playlist_id}/tracks` endpoint. You can provide a list of track IDs in the request body to add them to the playlist.
