const express = require('express');
const spotify = require('../spotify');

module.exports = io => {
  const router = express.Router();
  router.route('/playlists')
  .get(function(req, res) {
    spotify.getUserPlaylists(req.session.tokens, req.user.id, function(err, playlists) {
      if (err) res.status(err.statusCode).send(err);
      else res.status(200).send(playlists);
    });    
  })
  .post(function(req, res) {
    var preferences = req.body;
    spotify.createPlaylist(req.session.tokens, req.user.id, preferences, function(err, result) {
      if(err) res.status(err.statusCode).send(err);
      else res.send(result);
    });
  });

  router.post('/play', function(req, res) {
    const playlist = req.body.playlist;
    dbHelpers.getPlaylistOwner(playlist)
    .then(playlistOwner => {
      if (playlistOwner.user_id !== req.user.id) {
        dbHelpers.getUser(playlistOwner.user_id)
        .then(owner => {
          const ownerTokens = {
            accessToken: owner.access_token,
            refreshToken: owner.refresh_token
          };
          spotify.startPlaylist(ownerTokens, playlist, function(err) {
            if (err) res.status(err.statusCode).send(err);
            else {              
              require('../workers/spotifyCron')(ownerTokens, io).start();
              res.sendStatus(201);
            }
          });
        })
      } else {
        const userTokens = req.session.tokens;
        if (spotify.hasAccessToken(userTokens)) {
          spotify.startPlaylist(userTokens, playlist, function(err) {
            if (err) res.status(err.statusCode).send(err);
            else {        
              require('../workers/spotifyCron')(userTokens, io).start();                    
              res.sendStatus(201);
            }
          });
        }
      }
    })
    .catch(err => console.log('spotifyRouter.js > /play > getPlaylistOwner error: ', err)); 
  });
  return router;
}
