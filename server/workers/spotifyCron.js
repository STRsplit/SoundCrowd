const cron = require('node-cron');
const spotify = require('../spotify');
const dbHelpers = require('../../database/dbHelpers');

module.exports = io => {
  // let task = cron.schedule('*/30 * * * * *', () => {
  let task = cron.schedule('*/10 * * * * *', () => {
    spotify.getCurrentSong((err, song) => {
      if (err) console.log('cron err', err);
      else {
        const { id, name, duration_ms } = song.item;
        const { progress_ms } = song;
        console.log((duration_ms - progress_ms) / 1000 + ' seconds left');
        if ((duration_ms - progress_ms) / 1000 < 30) {
          console.log('less than 30 seconds left');
        } else {
          let playlistId = song.context.uri.slice(-22);
          dbHelpers.getTrackByPosition(playlistId, 0)
          .then(track => {
            if (track) {
              if (track.song_id !== id) {
                dbHelpers.getTrackByPosition(playlistId, 1)
                .then(expectedTrack => {
                  if (expectedTrack.song_id !== id) {
                    // handle
                    console.log('not what we thought', expectedTrack.song_id);
                  } else {
                    dbHelpers.resetTrack(track.song_id, playlistId)
                    .then(() => {
                      reorderPlaylist(playlistId);
                      dbHelpers.reorderPlaylist(playlistId)
                      .then(playlist => {
                        io.sockets.in(playlistId).emit('updatePlaylist', playlist);
                        io.sockets.in(playlistId).emit('recentlyPlayed', track);
                      });
                    });
                  }
                });


                // dbHelpers.resetTrack(track.song_id, playlistId)
                // .then(dbHelpers.reorderPlaylist(playlistId)
                // .then(playlist => {
                //   io.sockets.in(playlistId).emit('updatePlaylist', playlist);
                //   io.sockets.in(playlistId).emit('recentlyPlayed', track);
                // }));
              } else {
                // song is still playing, execute regular spotify reorder
                reorderPlaylist(playlistId);
              }
            }
          });
        }
      }
    });

    // reorderPlaylist('4aPj9tROQjnmojwPbNmj2K');
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

function getNextSong() {
  
}
