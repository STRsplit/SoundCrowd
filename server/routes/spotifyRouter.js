var express = require('express');
var spotify = require('../spotify');

var router = express.Router();

router.route('/playlists')
  .get(function(req, res) {
    console.log(req);
    spotify.getUserPlaylists(req.user.id, function(err, playlists) {
      if (err) res.status(err.statusCode).send(err);
      else res.status(200).send(playlists);
    });    
  })
  .post(function(req, res) {
    var preferences = {
      mood: req.body.mood,
      activity: req.body.activity
    };
    spotify.createPlaylist(req.user.id, preferences, function(err, playlist) {
      if (err) res.status(err.statusCode).send(err);
      else res.sendStatus(201);
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
  if (spotify._credentials.accessToken) {
    const options = {
      uri: 'https://api.spotify.com/v1/me/player',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${spotify._credentials.accessToken}`
      },
      json: true
    }; 
    requestPromise(options)
    .then(info => {
      res.send(info);
    })
    .catch(err => console.log('getCurrentSongDetails err: ', err));
  } else {
    /* FUTURE TODO: Should logs out the user when access token expired or server restarted.
    // For logout
    req.logOut();
    req.session.destroy();

    // For refreshing approach
    spotify.refreshAccessToken()
    .then(data => {
      // Save the access token so that it's used in future calls
      spotify.setAccessToken(data.body['access_token']);
      console.log('The access token has been refreshed!');
    }, err => {
      console.log('Could not refresh access token', err);
    });
    */
  }
});

module.exports = router;