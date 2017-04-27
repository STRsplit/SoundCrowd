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

  router.get('/search', function(req, res) {
    const { name, filter } = req.query;
    spotify.searchFor(nreq.session.tokens, ame, filter, function(err, items) {
      if(err) res.status(err.statusCode).send(err);
      else res.status(200).send(items);
    });
  });

  router.post('/play', function(req, res) {
    if (spotify.hasAccessToken(req.session.tokens)) {
      spotify.startPlaylist(req.session.tokens, req.body.playlist, function(err) {
        if (err) res.status(err.statusCode).send(err);
        else {
          require('../spotifyCron')(req.session.tokens, io).start();
          res.sendStatus(201);
        }
      });
    }
  });
  return router;
}
