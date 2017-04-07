var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
const handler = require('./requestHandler');
var app = express();
var spotify = require('./spotify');

/* * Authentication * */
const session = require('express-session');
const passport = require('passport');
const spotifyAuth = require('./spotifyAuthentication');

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
// passport.authenticate('spotify', {scope: ['user-read-email', 'user-read-private'], showDialog: true})
app.get('/auth/spotify', passport.authenticate('spotify'));

app.get('/auth/spotify/callback', 
  passport.authenticate('spotify', {successRedirect: '/', failureRedirect: '/login'})
);

app.get('/api/verifyuser', handler.verifyUser);
/* *  Authentication * */

// app.get('/*', (req, res) => res.redirect('/'));

app.get('*', function(req, res) {
	res.sendFile(path.resolve(__dirname, '../public', 'index.html'));
});


app.listen(3000, function() {
  console.log('listening on port 3000!');
});