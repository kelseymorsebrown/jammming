# Next Step

Along with adding, your Jammming web app should allow users to remove songs from their playlists.

This function should trigger when the user presses the "remove" button next to a displayed track. To achieve this, implement a method that removes a selected song from the user's custom playlist.

To complete this step, create a method that can accept a track as an argument, and check if the passed-in track is in the playlist — there is a unique property of each track that can help you with this step, and if the song exists in the playlist, remove it.

The "remove" button can be anything. For example, a - sign provides a visual aid of "subtracting" or "removing" a song. An event listener can wait for the button to be clicked and trigger the method that removes the track from the playlist.

Don't forget to render the playlist component with the updated playlist to reflect the changes made by removing the track!
