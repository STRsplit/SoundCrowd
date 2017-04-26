const cron = require('node-cron');
const spotify = require('./spotify');
const dbHelpers = require('../database/dbHelpers');

module.exports = (tokens, io) => {
  let task = cron.schedule('*/10 * * * * *', () => {
    spotify.getCurrentSong(tokens, (err, song) => {
      if (err) console.log('cron err', err);
      else {
        const { id, name } = song.item;
        let playlistId = song.context.uri.slice(-22);
        dbHelpers.getTrackByPosition(playlistId, 0)
        .then(track => {
          if (track) {
            if (track.song_id !== id) {
              dbHelpers.resetTrack(track.song_id, playlistId)
              .then(dbHelpers.reorderPlaylist(playlistId)
              .then(playlist => {
                io.sockets.in(playlistId).emit('updatePlaylist', playlist);
              }));
            }
          }
        });
      }
    });
  });

  return task;
}
