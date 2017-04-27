const cron = require('node-cron');
const spotify = require('../spotify');
const dbHelpers = require('../../database/dbHelpers');

module.exports = io => {
  let task = cron.schedule('*/10 * * * * *', () => {
    // spotify.getCurrentSong((err, song) => {
    //   if (err) console.log('cron err', err);
    //   else {
    //     const { id, name } = song.item;
    //     let playlistId = song.context.uri.slice(-22);
    //     dbHelpers.getTrackByPosition(playlistId, 0)
    //     .then(track => {
    //       if (track) {
    //         if (track.song_id !== id) {
    //           dbHelpers.resetTrack(track.song_id, playlistId)
    //           .then(dbHelpers.reorderPlaylist(playlistId)
    //           .then(playlist => {
    //             io.sockets.in(playlistId).emit('updatePlaylist', playlist);
    //             io.sockets.in(playlistId).emit('recentlyPlayed', track);
    //           }));
    //         } else {
    //           // song is still playing, execute regular reorder
    //           reorderPlaylist(playlistId);
    //         }
    //       }
    //     });
    //   }
    // });

    reorderPlaylist('1FyQ7Xxacq3Z0acnyFYzRw');
  });

  return task;
}

function reorderPlaylist(playlistId) {
  dbHelpers.getPlaylistOwner(playlistId)
  .then(owner => {
    let user = owner.user_id;
    // get songs 1-n for playlist from db
    dbHelpers.reorderPlaylist(playlistId)
    .then(tracks => {
      // tracks = all tracks from playlist, so remove the first one
      tracks.splice(0, 1);
      console.log('after splice', tracks[0], tracks.length);
      // tracks = tracks.map(track => {
      //   return { 'uri': `spotify:track:${track.dataValues.song_id}` };
      // });
      tracks = tracks.map(track => {
        return `spotify:track:${track.dataValues.song_id}`;
      });
      // on spotify, delete songs 1-n
      spotify.removeTracksFromPlaylist(user, playlistId, tracks)
      // add songs back to spotify from db order
      .then(spotify.addTracksToPlaylist(user, playlistId, tracks));
    });
  });
}