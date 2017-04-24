const cron = require('node-cron');
const spotify = require('./spotify');
const socketManager = require('./sockets')
const dbHelpers = require('../database/dbHelpers');

module.exports = cron.schedule('*/10 * * * * *', function() {
  spotify.getCurrentSong((err, song) => {
    if (err) console.log('cron err', err);
    else {
      const { id, name } = song.item;
      console.log('song id', id);
      // var playlistId = song.context.uri.slice(-22);
      var playlistId = '0GX5C9HO78OtzHUBDJv1xQ';
      dbHelpers.getTrackByPosition(playlistId, 0)
        .then(track => {
          if (track) {
            console.log('top song id', track.dataValues.song_id);
            if (track !== id) {
              // assume the last song ended
              dbHelpers.resetTrack(track.dataValues.song_id, playlistId)
                .then(dbHelpers.reorderPlaylist(playlistId))
                  .then(playlist => {
                    console.log('reordered playlist', playlist);
                    // emit socket event with new order
                  });
              // update current song bar & slider position
            } else {
              console.log(playlistId + '=' + topSongId);
              // update slider position ?
            }
          } else {
            console.log(track);
          }
        });
    }
  });
});
