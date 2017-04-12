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


app.get('/test', spotify.test);

app.get('/playlist', spotify.getPlaylist);

app.post('/create', spotify.createPlaylist);


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

app.get('/api/search/', spotify.searchFor);

// REPLACE IF NEEDED
// passport.authenticate('spotify', {scope: ['user-read-email', 'user-read-private', 'playlist-read-private'], showDialog: true})
app.get('/auth/spotify', passport.authenticate('spotify', {scope: ['playlist-modify', 'playlist-modify-public', 'playlist-modify-private'], responseType: 'token', showDialog: true}));

app.get('/auth/spotify/callback', 
  passport.authenticate('spotify', { successRedirect: '/', failureRedirect: '/login' })
);

// app.get('/api/trackTest', function(req, res) {
//   spotify.moveTrack('stevie_reed', '3QcrAjiWGfmgDABjGdi5Ru', function(err) {
//     if (err) res.status(err.statusCode).send(err);
//     else res.status(200).send();
//   });
// });

/* *  Authentication * */
app.get('/api/verifyuser', handler.verifyUser);

/* * Spotify API * */
app.get('/api/spotify/playlists', function(req, res) {
  spotify.getUserPlaylists(req.user.id, function(err, playlists) {
    if (err) res.status(err.statusCode).send(err);
    else res.status(200).send(playlists);
  });
});

app.get('/api/spotify/playlists/:playlist', function(req, res) {
  var playlist = req.params.playlist;
  spotify.getPlaylist(req.user.id, playlist, function(err, tracks) {
    if (err) res.status(err.statusCode).send(err);
    else {
      dbHelpers.savePlaylist(playlist, req.user.id, tracks);
      res.status(200).send(tracks);
    }
  });
});

app.post('/api/vote', function(req, res) {
  handler.validateVote(req, res);
  // reorder songs if needed
  // if err, handle
  // else
    // emit socket event
      // update vote count for that track
      // needs updated playlist order (just the two that have flipped?)
      // something like io.emit('flip', 1, 2)
    // respond to client
  res.sendStatus(201);
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