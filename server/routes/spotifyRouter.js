const express = require('express');
const spotify = require('../spotify');

module.exports = io => {
  const router = express.Router();
  router.route('/playlists')
  .get(function(req, res) {
    spotify.getUserPlaylists(req.user.id, function(err, playlists) {
      if (err) res.status(err.statusCode).send(err);
      else res.status(200).send(playlists);
    });    
  })
  .post(function(req, res) {
    var preferences = req.body;
    spotify.createPlaylist(req.user.id, preferences, function(err, result) {
      if(err) res.status(err.statusCode).send(err);
      else res.send(result);
    });
  });

  router.get('/search', function(req, res) {
    const { name, filter } = req.query;
    spotify.searchFor(name, filter, function(err, items) {
      if(err) res.status(err.statusCode).send(err);
      else res.status(200).send(items);
    });
  });

  router.get('/current_song', function(req, res) {
    if (spotify.hasAccessToken()) {   
      spotify.getCurrentSong(function(err, info) {
        if (err) res.status(err.statusCode).send(err);
        else res.status(200).send(info);
      });   
    } else {
      req.logout();
      req.session.destroy();
      res.status(401).send('User is not logged in.');    
    }
  });

  router.post('/play', function(req, res) {
    if (spotify.hasAccessToken()) {
      spotify.startPlaylist(req.body.playlist, function(err) {
        if (err) res.status(err.statusCode).send(err);
        else {
          require('../spotifyCron')(io).start();
          res.sendStatus(201);
        }
      });
    }
  });

  return router;
}
