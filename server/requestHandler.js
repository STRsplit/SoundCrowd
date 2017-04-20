const db = require('../database/db');
const dbHelpers = require('../database/dbHelpers');
const spotify = require('./spotify');

const verifyUser = (req, res) => {
  obj = {login: req.isAuthenticated()}
  if (req.user) obj.name = req.user.name;
  else obj.name = '';
  res.send(obj);
};

// RETURNS PROMISE OBJECT THAT CONTAINS TRUE IF VOTED ALREADY FALSE OTHERWISE
// EXPECTED INPUT: songId and playlistId
// EXPECTED votes column names are song_id, user_id, playlist_id
// const validateVote = (req, res) => {
//   const { songId, playlistId, vote } = req.body;
//   var voteObj = {
//     song_id: songId, 
//     playlist_id: playlistId,
//     vote: vote
//   }
//   if ( req.isAuthenticated() ) { 
//     voteObj.user_id = req.user.id;
//     return db.Vote.find({ where: voteObj })
//     .then(result => {
//       if (!result) {
//         // db.Vote.create({ voteObj });
//         db.Vote.create({
//           song_id: voteObj.song_id,
//           playlist_id: voteObj.playlist_id,
//           user_id: voteObj.user_id,
//           vote: vote
//         });
//         dbHelpers.updateVoteCount(songId, playlistId, vote);
//         return false;
//       } else return true;
//     })
//     .catch(err => console.log('requestHandler > validateVote error: ', err));
//   } else {
//     voteObj.session_id = req.sessionID;
//     return db.Vote.find({ where: voteObj })
//     .then(result => {
//       if (!result) {
//         // db.Vote.create({ voteObj });
//         db.Vote.create({
//           song_id: voteObj.song_id,
//           playlist_id: voteObj.playlist_id,
//           session_id: voteObj.session_id,
//           vote: vote
//         });
//         dbHelpers.updateVoteCount(songId, playlistId, vote);
//         return false;
//       } else return true;
//     })
//     .catch(err => console.log('requestHandler > validateVote error: ', err));
//   }
// };
const validateVote = (voteData) => {
  console.log('VOTE DATAAAAAAA', voteData)
  return new Promise((resolve, reject) => {
    const { songId, playlistId, vote, user_id, session_id } = voteData
    var voteObj = {
      song_id: songId, 
      playlist_id: playlistId,
      vote: vote
    }
    if (user_id !== '') {
      voteObj.user_id = user_id
      return db.Vote.find({ where: voteObj })
      .then(result => {
        if (!result) {
          // db.Vote.create({ voteObj });
          db.Vote.create({
            song_id: voteObj.song_id,
            playlist_id: voteObj.playlist_id,
            user_id: voteObj.user_id,
            vote: vote
          });
          dbHelpers.updateVoteCount(songId, playlistId, vote)
          .then(song => {
            resolve(song)
          })
        } else resolve(false)
      })
      .catch(err => console.log('requestHandler > validateVote error: ', err))
    } else {
      voteObj.session_id = session_id
      return db.Vote.find({ where: voteObj })
      .then(result => {
        if (!result) {
          // db.Vote.create({ voteObj });
          db.Vote.create({
            song_id: voteObj.song_id,
            playlist_id: voteObj.playlist_id,
            session_id: voteObj.session_id,
            vote: vote
          });
          dbHelpers.updateVoteCount(songId, playlistId, vote)
          .then(song =>{
            resolve(song)
          })
        } else resolve(false)
      })
      .catch(err => console.log('requestHandler > validateVote error: ', err));
    }
  });
};


const logoutUser = (req, res) => {
  req.logout();
  req.session.destroy(function(err) {
    res.redirect('/');
  });
};



module.exports = {
  verifyUser,
  validateVote,
  logoutUser
};