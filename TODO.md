# Next Step

Your Jammming web app should allow the user to customize their playlist title and tracks. When a user creates a playlist, your app should display the playlist name and tracks from the playlist.

Create a unidirectional data flow from your root component to relevant children components. This data flow should pass down the playlist name and tracks.

Things to keep in mind:

- You can create a mock string containing the playlist name and tracks to test your code.
- If you've set up your static components with the proper representation for the core components of the interface, you can pass the playlist tracks from the component responsible for the Playlist to the component responsible for the Tracklist.
- Consider using state to store information such as the playlist name and playlist tracks.
