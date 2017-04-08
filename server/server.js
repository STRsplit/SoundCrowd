var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var handler = require('./requestHandler');
var spotify = require('./spotify');
var db = require('../database/db');
var app = express();
var port = process.env.PORT || 3000;
/* * Authentication * */
var session = require('express-session');
var passport = require('passport');
var spotifyAuth = require('./spotifyAuthentication');

app.use(express.static(__dirname + '/../public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));



/* *  Authentication * */
app.use(session({
  secret: 'badum tsss', 
  resave: true, 
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());


app.get('/api/search/', spotify.searchFor);

// REPLACE IF NEEDED
// passport.authenticate('spotify', {scope: ['user-read-email', 'user-read-private', 'playlist-read-private'], showDialog: true})
app.get('/auth/spotify', passport.authenticate('spotify', {responseType: 'token', showDialog: true}));

app.get('/auth/spotify/callback', function(req, res) {
    passport.authenticate('spotify', { failureRedirect: '/login' });
    spotify.authenticate(req.query.code, function(err) {
      if (err) res.status(err.statusCode).send(err);
      else {
        // user from session? on redirect?
        var user = 'lgreenbaum';
        spotify.getUserPlaylists(user, function(err, playlists) {
          if (err) res.status(err.statusCode).send(err);
          else res.status(200).send(playlists);
        });
      }
    });
  }
);

/* *  Authentication * */
app.get('/api/verifyuser', handler.verifyUser);

/* * Spotify API * */
app.get('/api/playlists/:playlist', function(req, res) {
  spotify.getPlaylist('username', req.params.playlist, function(err, tracks) {
    // render tracks from playlist and start voting
  });
});

app.get('*', function(req, res) {
	res.sendFile(path.resolve(__dirname, '../public', 'index.html'));
});


app.listen(port, function() {
  console.log(`listening on port!${port}`);
});