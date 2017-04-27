const cron = require('node-cron');
const spotify = require('../spotify');
const dbHelpers = require('../../database/dbHelpers');

module.exports = io => {
  let task = cron.schedule('*/15 * * * * *', () => {
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

    reorderPlaylist('7aKQOzNgVw8r72iH14TLxk');
  });

  return task;
}

function reorderPlaylist(playlistId) {
  dbHelpers.getPlaylistOwner(playlistId)
  .then(owner => {
    let user = owner.user_id;
    dbHelpers.getPlaylist(playlistId)
    .then(tracks => {
      tracks.splice(0, 1);
      tracks = tracks.map(track => {
        return `spotify:track:${track.dataValues.song_id}`;
      });
      spotify.removeTracksFromPlaylist(user, playlistId, tracks)
      .then(spotify.addTracksToPlaylist(user, playlistId, tracks));
    });
  });
}