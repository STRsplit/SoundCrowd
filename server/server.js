var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var handler = require('./requestHandler');
var spotify = require('./spotify');
var db = require('../database/db');

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


/* *  Authentication * */
app.use(session({
  secret: 'badum tsss', 
  store: new redisStore({
    host: process.env.SITE_URL || 'localhost',
    port: process.env.REDIS_PORT || 6379,
    client: client,
    ttl: 30 // ttl is expiration in seconds. 260 seconds default, 86400 sec === 1day
  }),
  resave: false, 
  saveUninitialized: true
}));
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
app.get('/api/playlists', function(req, res) {
  // user from session?
  var user = 'stevie_reed';
  spotify.getUserPlaylists(user, function(err, playlists) {
    if (err) res.status(err.statusCode).send(err);
    else res.status(200).send(playlists);
  });
});

app.get('/api/playlists/:playlist', function(req, res) {
  spotify.getPlaylist('username', req.params.playlist, function(err, tracks) {
    // render tracks from playlist and start voting
  });
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