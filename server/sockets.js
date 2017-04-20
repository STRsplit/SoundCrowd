const db = require('../database/db');
const dbHelpers = require('../database/dbHelpers');
const spotify = require('./spotify');
const handler = require('./requestHandler');


module.exports = function(io){
  io.on('connection', (socket) => {
    socket.on('playlistId', (playlistId) => {
      socket.join(playlistId);
      io.to(playlistId).emit('join', `Joined: ${playlistId}`)
    })

    socket.on('recordVote', (voteData) => {
      const { songId, playlistId, vote, session_id, user_id } = voteData
      handler.validateVote(voteData)
      .then(song => {
        if(song){
          dbHelpers.checkForReorder(song, playlistId, vote)
          .then(playlists => {
            if(playlists.length > 0){
              io.sockets.in(playlistId).emit('updatePlaylist', playlists)
            } else {
              io.sockets.in(playlistId).emit('updateSongVoteCount', voteData)
            }
          })
        } else socket.emit('voteError', "Hey, you've voted on this song idiot.")
      })
    })
    console.log('a user connected', socket.id);
  })
}
