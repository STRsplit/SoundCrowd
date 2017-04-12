var { Playlist, Song, Vote } = require('./db.js');

var savePlaylist = function(playlistId, userId, tracks) {
  Playlist.findOrCreate({ where: {
    playlist_id: playlistId,
    user_id: userId
  }})
    .then(playlist => {
      tracks.items.forEach(track => {
        Song.create({
          song_id: track.track.id,
          playlist_id: playlistId,
          vote_count: 0
        })
        .then(() => {
          // console.log('saved ' + track.track.id);
        })
      })
      return playlist;
    })
    .catch(err => {
      console.log(err);
      // return err;
    });
}

var updateVoteCount = function(songId, playlistId, vote) {
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

module.exports.savePlaylist = savePlaylist;
module.exports.updateVoteCount = updateVoteCount;