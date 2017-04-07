var express = require('express');
var path = require('path');
var dotenv = require('dotenv').config();
var bodyParser = require('body-parser');
var handler = require('./requestHandler');
var spotify = require('./spotify');
var restClient = require('node-rest-client').Client;
var db = require('../database/db');
var app = express();
var spotify = require('./spotify');

/* * Authentication * */
var session = require('express-session');
var passport = require('passport');
var spotifyAuth = require('./spotifyAuthentication');

app.use(express.static(__dirname + '/../public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/search/:search', spotify.searchFor);


/* *  Authentication * */
app.use(session({
  secret: 'badum tsss', 
  resave: true, 
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// REPLACE IF NEEDED
// passport.authenticate('spotify', {scope: ['user-read-email', 'user-read-private', 'playlist-read-private'], showDialog: true})
app.get('/auth/spotify', passport.authenticate('spotify', {responseType: 'token', scope: ['user-read-email', 'user-read-private', 'playlist-read-private'], showDialog: true}));

app.get('/auth/spotify/callback', 
  function(req, res) {
    spotify.authenticate(req.query.code, function(something) {
      console.log(something);
    });
  }
  // passport.authenticate('spotify', {successRedirect: '/api/playlists', failureRedirect: '/login'})
);

app.get('/api/verifyuser', handler.verifyUser);

/* * Spotify API * */
app.get('/api/playlists', function(req, res) {
  console.log('request', req);
  // console.log('request code', req.query.code);
  // get spotify username from session? on redirect from login?
  spotify.getUserPlaylists(req.user.id, function(err, playlists) {
    if (err) res.status(err.statusCode).send(err);
    else res.status(200).send(playlists);
  });
  // spotify.getUserPlaylists('eugenepenaranda0037')
  //   .then(function(data) {
  //     res.status(200).send(data.body);
  //   })
  //   .catch(function(err) {
  //     res.status(err.statusCode).send(err);
  //   });
});

app.get('/api/playlists/:playlist', function(req, res) {
  spotify.getPlaylist('username', req.params.playlist, function(err, tracks) {

  });
});

app.get('*', function(req, res) {
	res.sendFile(path.resolve(__dirname, '../public', 'index.html'));
});


app.listen(3000, function() {
  console.log('listening on port 3000!');
});