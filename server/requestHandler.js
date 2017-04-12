const db = require('../database/db');
const dbHelpers = require('../database/dbHelpers');

const verifyUser = (req, res) => {
  console.log('req.sessionID', req.sessionID);
  res.send(req.user);
};

// RETURNS PROMISE OBJECT THAT CONTAINS TRUE IF VOTED ALREADY FALSE OTHERWISE
// EXPECTED INPUT: songId and playlistId
// EXPECTED votes column names are song_id, user_id, playlist_id
const validateVote = (req, res) => {
  const { songId, playlistId, vote } = req.body;
  if ( req.isAuthenticated() ) { 
    return db.Vote.findOrCreate({where: {
        song_id: songId, 
        user_id: req.user.id,
        playlist_id: playlistId,
        vote: vote
      }
    })
    .then(result => {
      dbHelpers.updateVoteCount(songId, vote);
      return Boolean(result);
    })
    .catch(err => console.log('requestHandler > validateVote error: ', err));
  } else {
    return db.Vote.findOrCreate({where: {
        song_id: songId, 
        session_id: req.sessionID,
        playlist_id: playlistId,
        vote: vote
      }
    })
    .then(result => {
      return Boolean(result);
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
  verifyUser: verifyUser,
  validateVote: validateVote,
  logoutUser: logoutUser
};