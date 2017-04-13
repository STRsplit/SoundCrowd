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
  req.logout();
  req.session.destroy(function(err) {
    res.redirect('/');
  });
};

const addTrack = (req, res) => {
  console.log('INFO YOU WANTED', req.trackInfo, req.body)
  const { song_id, playlist_id } = req.body.track
  let addedSong = db.Song.build({
      song_id: song_id, 
      playlist_id: playlist_id,
      vote_count: 1
    });

  addedSong.save()
  .then(result => {
    return;
  })
  .catch(err => {
    console.log('requestHandle > addTrack errr: ', err)
  })
};

module.exports = {
  verifyUser,
  validateVote,
  logoutUser,
  addTrack
};