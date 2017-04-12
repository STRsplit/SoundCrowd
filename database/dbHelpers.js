var { Playlist, Song, Vote } = require('./db.js');

module.exports = {
  getPlaylist: function(playlistId) {
    return new Promise((resolve, reject) => {
      Song.findAll({ where: { playlist_id: playlistId }})
        .then(songs => {
          resolve(songs);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  savePlaylist: function(playlistId, userId, tracks) {
    return new Promise((resolve, reject) => {
      Playlist.findOrCreate({ where: {
        playlist_id: playlistId,
        user_id: userId
      }})
        .then(playlist => {
          tracks = tracks.items.map(track => {
            var trackObj = {
              song_id: track.track.id,
              playlist_id: playlistId,
              title: track.track.name,
              artist: track.track.artists ? track.track.artists[0].name : '',
                // weird issue where rarely there's no artists array
                // fix later to map all artist names to string, then save
              vote_count: 0
            }; 
            return trackObj;
          });

          Song.bulkCreate(tracks)
            .then(savedTracks => {
              resolve(savedTracks);
            });
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  updateVoteCount: function(songId, playlistId, vote) {
    Song.find({ where: {
      song_id: songId,
      playlist_id: playlistId
    }})
      .then(song => {
        console.log(song);
        var newCount = song.vote_count + vote;
        song.update({ vote_count: newCount });
      });
  }
};