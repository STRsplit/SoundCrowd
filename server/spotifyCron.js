const cron = require('node-cron');
const spotify = require('./spotify');
const socketManager = require('./sockets')
const dbHelpers = require('../database/dbHelpers');

module.exports = io => {
  var task = cron.schedule('*/10 * * * * *', () => {
    console.log('executing cron job....................');
    spotify.getCurrentSong((err, song) => {
      if (err) console.log('cron err', err);
      else {
        const { id, name } = song.item;
        console.log('song id', id);
        var playlistId = song.context.uri.slice(-22);
        dbHelpers.getTrackByPosition(playlistId, 0)
          .then(track => {
            if (track) {
              console.log('top song id', track.song_id);
              if (track.song_id !== id) {
                // assume the last song ended
                dbHelpers.resetTrack(track.song_id, playlistId)
                  .then(dbHelpers.reorderPlaylist(playlistId)
                    .then(playlist => {
                      io.sockets.in(playlistId).emit('updatePlaylist', playlist);
                      console.log('reordered playlist', playlist);
                      // emit socket event with new order
                    }));
              }
            }
          });
      }
    });
  });

  return task;
}
