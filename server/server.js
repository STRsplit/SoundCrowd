var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var handler = require('./requestHandler');
var spotify = require('./spotify');
var db = require('../database/db');
var dbHelpers = require('../database/dbHelpers');

/* * Authentication * */
var session = require('express-session');
var redis = require('redis');
var redisStore = require('connect-redis')(session);
var passport = require('passport');
var client = process.env.REDIS_URL ? redis.createClient(process.env.REDIS_URL) : redis.createClient();


var app = express();
var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/../public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/* *  Authentication * */
app.use(session({
  secret: 'badum tsss', 
  store: new redisStore({
    host: process.env.SITE_URL || 'localhost',
    port: process.env.REDIS_PORT || 6379,
    client: client,
    ttl: 300 // ttl is expiration in seconds. 260 seconds default, 86400 sec === 1day
  }),
  resave: false, 
  saveUninitialized: true
}));
// SETUP FOR NON-REDIS SESSION
// app.use(session({
//   secret: 'badum tsss', 
//   resave: true, 
//   saveUninitialized: true
// }));
app.use(passport.initialize());
app.use(passport.session());


/* *  Authentication * */

// REPLACE IF NEEDED
// passport.authenticate('spotify', {scope: ['user-read-email', 'user-read-private', 'playlist-read-private'], showDialog: true})
app.get('/auth/spotify', passport.authenticate('spotify', {scope: ['playlist-modify', 'playlist-modify-public', 'playlist-modify-private', 'user-read-currently-playing', 'user-read-playback-state'], responseType: 'token', showDialog: true}));

app.get('/auth/spotify/callback', 
  passport.authenticate('spotify', { successRedirect: '/', failureRedirect: '/login' })
);

app.get('/api/verifyuser', handler.verifyUser);

app.get('/logout', handler.logoutUser);

/* * Spotify API * */
app.get('/api/playlist/currentsong', spotify.getCurrentSongDetails);

app.get('/name', spotify.getName);

app.route('/api/spotify/playlists')
  .get(function(req, res) {
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

app.get('/api/spotify/search/', function(req, res) {
  const { name, filter } = req.query
  spotify.searchFor(name, filter, function(err, items) {
    if(err) res.status(err.statusCode).send(err);
    else {
      res.status(200).send(items);
    }
  })
});

app.get('/api/playlists/:playlist', function(req, res) {
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

app.post('/api/vote', function(req, res) {
  handler.validateVote(req, res);
  spotify.moveTrack(req.user.id, req.body.playlistId, function(err) {
    if (err) console.log(err);
  });
    // emit socket event
      // update vote count for that track
      // needs updated playlist order (just the two that have flipped?)
      // something like io.emit('flip', 1, 2)
    // respond to client
  res.sendStatus(201);
});


app.post('/api/tracks', function(req, res) {
  console.log(req.body);
  let song = req.body.track

  dbHelpers.addTrack(song, function(err, success) {
    console.log(err);
    if(err) res.status(err.statusCode).send(err);
    else {
      res.sendStatus(201)
    }
  })
});

app.get('*', function(req, res) {
	res.sendFile(path.resolve(__dirname, '../public', 'index.html'));
});

// Unhandled Endpoints
app.get('/*', function(req, res) {
  res.redirect('/');
});

app.listen(port, function() {
  console.log(`listening on port!${port}`);
});