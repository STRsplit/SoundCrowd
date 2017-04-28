const cron = require('node-cron');
const spotify = require('../spotify');
const dbHelpers = require('../../database/dbHelpers');

module.exports = (tokens, io) => {
  let task = cron.schedule('*/30 * * * * *', () => {
    spotify.getCurrentSong(tokens, (err, song) => {
      if (err) console.log('cron err', err);
      else {
        const { id, name, duration_ms } = song.item;
        const { progress_ms } = song;
        if ((duration_ms - progress_ms) / 1000 > 30) {
          let playlistId = song.context.uri.slice(-22);
          dbHelpers.getTrackByPosition(playlistId, 0)
          .then(track => {
              if (track.song_id !== id) {
                dbHelpers.getTrackByPosition(playlistId, 1)
                .then(expectedTrack => {
                  if (expectedTrack.song_id !== id) {
                    dbHelpers.getTrackById(id, playlistId)
                    .then(track => {
                      expectedTrack.update({ position: track.position })
                      .then(track.update({ position: expectedTrack.position }))
                      .then(reorderPlaylist(tokens, playlistId));
                    });
                  } else {
                    reorderPlaylist(tokens, playlistId);
                  }
                });
              } else reorderInSpotify(tokens, playlistId);
          });
        }
      }
    });
  });

  return task;
}

function reorderPlaylist(tokens, playlistId) {
  dbHelpers.resetTrack(track.song_id, playlistId)
  .then(() => {
    dbHelpers.reorderPlaylist(playlistId)
    .then(playlist => {
      reorderInSpotify(tokens, playlistId);
      io.sockets.in(playlistId).emit('updatePlaylist', playlist);
      io.sockets.in(playlistId).emit('recentlyPlayed', track);
    });
  });
}

function reorderInSpotify(tokens, playlistId) {
  dbHelpers.getPlaylistOwner(playlistId)
  .then(owner => {
    let user = owner.user_id;
    dbHelpers.getPlaylist(playlistId)
    .then(tracks => {
      tracks.splice(0, 1);
      tracks = tracks.map(track => {
        return `spotify:track:${track.dataValues.song_id}`;
      });
      spotify.removeTracksFromPlaylist(tokens, user, playlistId, tracks)
      .then(spotify.addTracksToPlaylist(tokens, user, playlistId, tracks));
    });
  });
}
