var cron = require('node-cron');
var spotify = require('./spotify');
var dbHelpers = require('../database/dbHelpers');

var currentSong;
var job = cron.schedule('*/10 * * * * *', function() {
  spotify.getCurrentSong((err, song) => {
    if (err) console.log('cron err', err);
    else {
      console.log('cron song:', song.item.id, song.item.name);
      if (currentSong) {
        if (currentSong !== song.item.id) {
          // assume the last song ended
          // reset vote count to 0 and sort playlist
          // emit new playlist order with socket event
          // update current song bar & slider position
        } else {
          // update slider position ?
        }
      } else currentSong = song.item.id;
    }
  })
});

module.exports = job;