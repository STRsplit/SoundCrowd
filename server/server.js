var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var handler = require('./requestHandler');
var router = require('./routes/router');
var spotifyRouter = require('./routes/spotifyRouter');
var spotifyCronJob = require('./spotifyCron');
spotifyCronJob.start();





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

/* * Socket Integration * */
var server = app.listen(port, function(){
  console.log("Server started: http://localhost:" + port + "/");
})

var io = require("socket.io").listen(server);

io.on('connection', function(socket){

  socket.on('playlistId', function(playlistId) {
    socket.join(playlistId);
    io.to(playlistId).emit('join', `Joined: ${playlistId}`)
  })

  socket.on('recordVote', function(voteData) {
    const { songId, playlistId, vote } = voteData
    dbHelpers.updateVoteCount(songId, playlistId, vote)
    .then((playlists) => {
      io.sockets.in(playlistId).emit('updatePlaylist', playlists);
    })
    .catch((err) => {
      io.sockets.in(playlistId).emit('updatePlaylist', null);
    })
  })
  console.log('a user connected', socket.id);
});





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
app.use('/api', router);
app.use('/api/spotify', spotifyRouter);


/* *  Authentication * */

// REPLACE IF NEEDED
// passport.authenticate('spotify', {scope: ['user-read-email', 'user-read-private', 'playlist-read-private'], showDialog: true})
app.get('/auth/spotify', passport.authenticate('spotify', {scope: ['playlist-modify', 'playlist-modify-public', 'playlist-modify-private', 'user-read-currently-playing', 'user-read-playback-state'], responseType: 'token', showDialog: true}));

app.get('/auth/spotify/callback', 
  passport.authenticate('spotify', { successRedirect: '/', failureRedirect: '/login' })
);

app.get('/logout', handler.logoutUser);
app.get('*', function(req, res) {
	res.sendFile(path.resolve(__dirname, '../public', 'index.html'));
});

// Unhandled Endpoints
app.get('/*', function(req, res) {
  res.redirect('/');
});

// app.listen(port, function() {
//   console.log(`listening on port!${port}`);
// });

