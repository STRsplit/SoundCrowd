const db = require('../database/db');
const dbHelpers = require('../database/dbHelpers');
const spotify = require('./spotify');
const handler = require('./requestHandler');


module.exports = io => {
  io.on('connection', socket => {
    socket.on('playlistId', playlistId => {
      socket.join(playlistId);
      io.to(playlistId).emit('join', `Joined: ${playlistId}`)
    });

    socket.on('recordVote', voteData => {
      console.log('in record vote', voteData);
      const { songId, playlistId, vote, session_id, user_id } = voteData;
      handler.validateVote(voteData)
      .then(song => {
        if(song){
          dbHelpers.checkForReorder(song, playlistId, vote)
          .then(tracks => {
            if(tracks){
              io.sockets.in(playlistId).emit('updatePlaylist', tracks);
            } else {
              io.sockets.in(playlistId).emit('updateSongVoteCount', voteData);
            }
          })
        } else {
          socket.emit('voteError', "Hey, you've voted on this song already.");
        }
      })
    })
  })
}

var updatePlaylists = function() {
  io.sockets.in(playlistId).emit('updatePlaylist', tracks);
}
