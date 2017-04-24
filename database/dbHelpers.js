const { Playlist, Song, Vote } = require('./db.js');

module.exports = {
  checkForReorder: function(song, playlistId, vote) {
    return new Promise((resolve, reject) => {
      Song.findAll({
        where: { 
          playlist_id: playlistId, 
          vote_count: song.vote_count - vote,
          song_id: { $not: song.song_id }
        },
        order: ['position']
      })
        .then(songs => {
          if (songs.length) {
            resolve(this.reorderPlaylist(playlistId));
          } else {
            resolve(null);
          }
    })
      })
      .catch(err => {
        reject(err);
      });
  },

  getPlaylist: function(playlistId) {
    return new Promise((resolve, reject) => {
      Song.findAll({ 
        where: { playlist_id: playlistId },
        order: ['position']
      })
        .then(songs => {
          resolve(songs);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  getPlaylistOwner: function(playlistId) {
    return new Promise((resolve, reject) => {
      Playlist.findOne({
        attributes: ['user_id'],
        where: { playlist_id: playlistId }
      })
        .then(owner => {
          resolve(owner);
        })
        .catch(err => {
          reject(err);
        })
    });
  },

  savePlaylist: function(playlistId, userId, tracks) {
    return new Promise((resolve, reject) => {
      Playlist.findOrCreate({ where: {
        playlist_id: playlistId,
        user_id: userId
      }})
        .then(playlist => {
          let position = 0;
          tracks = tracks.items.map(track => {
            let trackObj = {
              song_id: track.track.id,
              playlist_id: playlistId,
              title: track.track.name,
              artist: track.track.artists ? track.track.artists[0].name : '',
                // weird issue where rarely there's no artists array
                // fix later to map all artist names to string, then save
              vote_count: 0,
              position: position++
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

  reorderPlaylist: function(playlistId) {
    return new Promise((resolve, reject) => {
      Song.findAll({ 
        where: { playlist_id: playlistId },
        order: [['vote_count', 'DESC']] 
      })
        .then(allSongs => {
          let position = 0;
          allSongs.forEach(song => {
            song.position = position++;
            song.save();
          });
          resolve(allSongs);
        })
        .catch(err => reject(err));
    });
  },

  updateVoteCount: function(songId, playlistId, vote) {
    Song.find({ where: {
      song_id: songId,
      playlist_id: playlistId
    }})
      .then(song => {
        let newCount = song.vote_count + vote;
        song.update({ vote_count: newCount })
          .then(() => {
            this.checkForReorder(song, playlistId, vote);
          });
      });
  },

  addTrack: function(song, cb) {
    let addedSong = Song.build({
        artist: song.artist,
        title: song.title,
        song_id: song.song_id,
        playlist_id: song.playlist_id,
        vote_count: 0
      });

    addedSong.save()
    .then(result => {
      cb(null, result)
    })
    .catch(err => {
      cb(err)
    })
  },

  getTrackByPosition: function(playlistId, position) {
    return new Promise((resolve, reject) => {
      Song.findOne({ 
        attributes: ['song_id'],
        where: {
          playlist_id: playlistId,
          position: position
        }
      })
        .then(song => {
          resolve(song);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  resetTrack: function(songId, playlistId) {
    return new Promise((resolve, reject) => {
      Song.findOne({ where: {
        song_id: songId,
        playlist_id: playlistId
      }})
        .then(song => song.update({ vote_count: 0, position: null }))
        .catch(err => reject(err));

        Vote.destroy({ where: {
          song_id: songId,
          playlist_id: playlistId
        }})
        .then(resolve(null))
        .catch(err => reject(err));
    });
  }
};