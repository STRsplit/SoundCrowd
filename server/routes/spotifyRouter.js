var express = require('express');
var spotify = require('../spotify');

var router = express.Router();

var preferences;

router.route('/playlists')
.get(function(req, res) {
  spotify.getUserPlaylists(req.user.id, function(err, playlists) {
    if (err) res.status(err.statusCode).send(err);
    else res.status(200).send(playlists);
  });    
})
.post(function(req, res) {
  preferences = {
    mood: req.body.mood,
    activity: req.body.activity
  };
  res.sendStatus(201);
});

router.get('/create', function(req, res) {
  console.log('in create successfully');
  console.log('preferences ', preferences);
  spotify.createPlaylist(req.user.id, preferences, function(err, result) {
    if(err) res.status(err.statusCode).send(err);
    else res.status(200).send(result);
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
  spotify.getCurrentSong(function(err, info) {
    if (err) res.status(err.statusCode).send(err);
    else res.status(200).send(info);
  });
});

module.exports = router;