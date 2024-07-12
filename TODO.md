# Next Step

Your Jammming web app should allow users to add songs from the search results to their custom playlist. To achieve this, implement a method that adds a selected song from the search results track list to the user's custom playlist. The method should be triggered when the user clicks an "add" button displayed next to each track in the search results list.

You will want to create a method that can accept a track as an argument, and check if the passed-in track is in the playlist already — there is a unique property of each track that can help you with this step, and if the song is new, add the song to the playlist.

The "add" button can be anything. For example, a + sign provides a visual aid of "adding" a song. An event listener can wait for the button to be clicked and trigger the method that adds the track to the playlist.

Don't forget to render the playlist component with the updated playlist to reflect the changes made by adding a new track!
