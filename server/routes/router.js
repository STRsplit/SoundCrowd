var express = require('express');
var dbHelpers = require('../../database/dbHelpers');
var spotify = require('../spotify');
var handler = require('../requestHandler');

var router = express.Router();

router.get('/user', function(req, res) {
  res.send(req.user);
});

router.get('/playlists/:playlist', function(req, res) {
  var playlist = req.params.playlist;
  dbHelpers.getPlaylist(playlist)
    .then(function(tracks) {
      if (tracks.length) {
        dbHelpers.getPlaylistOwner(playlist)
          .then(function(owner) {
              res.status(200).send({ owner: owner.user_id, tracks: tracks });
          });
      } else {
        if (req.isAuthenticated()) {
          spotify.getPlaylist(req.user.id, playlist, function(err, tracks) {
            if (err) res.status(err.statusCode).send(err);
            else {
              dbHelpers.savePlaylist(playlist, req.user.id, tracks)
                .then(function(savedTracks) {
                  res.status(200).send({ owner: req.user.id, tracks: savedTracks });
                })
                .catch(err => {
                  res.status(err.statusCode).send(err);
                });
            }
          });
        } else {
          res.sendStatus(404);
        }
      }
    });
});

router.post('/vote', function(req, res) {
  handler.validateVote(req, res);
  spotify.moveTrack(req.user.id, req.body.playlistId, function(err) {
    if (err) console.log(err);
  });
    // emit socket event
      // update vote count for that track
      // needs updated playlist order
    // respond to client
  res.sendStatus(201);
});

router.post('/tracks', function(req, res) {
  dbHelpers.addTrack(req.body.track, function(err, success) {
    if (err) res.status(err.statusCode).send(err);
    else res.sendStatus(201);
  });
});

router.get('/verify_user', handler.verifyUser);

module.exports = router;
