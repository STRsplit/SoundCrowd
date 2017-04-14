const db = require('../database/db');
const dbHelpers = require('../database/dbHelpers');
const spotify = require('./spotify');

const verifyUser = (req, res) => {
  res.send(req.isAuthenticated());
};

// RETURNS PROMISE OBJECT THAT CONTAINS TRUE IF VOTED ALREADY FALSE OTHERWISE
// EXPECTED INPUT: songId and playlistId
// EXPECTED votes column names are song_id, user_id, playlist_id
const validateVote = (req, res) => {
  const { songId, playlistId, vote } = req.body;
  var voteObj = {
    song_id: songId, 
    playlist_id: playlistId,
    vote: vote
  }
  if ( req.isAuthenticated() ) { 
    voteObj.user_id = req.user.id;
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
        dbHelpers.updateVoteCount(songId, playlistId, vote);
        return false;
      } else return true;
    })
    .catch(err => console.log('requestHandler > validateVote error: ', err));
  } else {
    voteObj.session_id = req.sessionID;
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
        dbHelpers.updateVoteCount(songId, playlistId, vote);
        return false;
      } else return true;
    })
    .catch(err => console.log('requestHandler > validateVote error: ', err));
  }
};

const logoutUser = (req, res) => {
  req.session.destroy(err => {
    // err ? console.log('requestHandler > logoutUser error: ', err) : res.redirect('/');
    if(err){
      console.log('requestHandler > logoutUser err', err);
    } else {
      res.redirect('/');
    }
  });
};


module.exports = {
  verifyUser,
  validateVote,
  logoutUser
};