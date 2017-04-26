const db = require('../database/db');
const dbHelpers = require('../database/dbHelpers');
const spotify = require('./spotify');

const verifyUser = (req, res) => {
  if (req.isAuthenticated() && spotify.hasAccessToken()) {
    res.send({
      login: true, 
      name: req.user.name
    });
  } else {
    req.logout();
    req.session.destroy();
    res.send({
      login: false, 
      name: ''
    });
  }
};

const validateVote = voteData => {
  return new Promise((resolve, reject) => {
    const { songId, playlistId, vote, user_id, session_id } = voteData;
    let voteObj = {
      song_id: songId, 
      playlist_id: playlistId,
      vote: vote
    };
    if (user_id.length) {
      voteObj.user_id = user_id
    } else {
      voteObj.session_id = session_id;
    }
    console.log('VOTE OBJ', voteObj)
    db.Vote.findOne({ where: voteObj })
    .then(result => {
      if (!result) {
        db.Vote.create(voteObj);
        dbHelpers.updateVoteCount(songId, playlistId, vote)
        .then(song => {
          resolve(song);
        })
      } else {
        resolve(null);
      }
    })
    .catch(err => console.log('requestHandler > validateVote error: ', err));
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
