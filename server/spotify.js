var SpotifyWebApi = require('spotify-web-api-node');

var spotifyAuth = require('./setup').spotifyAuth;
// spotifyAuth.scopes = ['user-read-email', 'user-read-private', 'playlist-read-private'];
var spotify = new SpotifyWebApi({ 
  clientId : '169b6e558aea4f4a8725d2ad38382923',
  clientSecret : '6c36dcc5feca4ac7bc2f86523af306d8',
  redirectUri : 'http://localhost:3000/auth/spotify/callback'
});

module.exports = {
  authenticate: function(code, cb) {
    console.log('auth', spotifyAuth);
    console.log('code', code);
    spotify.authorizationCodeGrant(code)
    .then(function(data) {
      console.log(data.access_token);
      cb(data);
      // console.log('The access token is ' + data['access_token']);
      // console.log('The refresh token is ' + data['refresh_token']);
    })
    .catch(err => {
      cb(err);
    });
  },
  getUserPlaylists: function(username, cb) {
    spotify.getUserPlaylists(username)
      .then(data => {
        cb(null, data.body);
      })
      .catch(err => {
        cb(err, null);
      });
  },  
  getPlaylist: function(username, playlistId, cb) {
    spotify.getPlaylistTracks()
      .then(data => {
        cd(null, data.body);
      })
      .catch(err => {
        cb(err, null);
      });
  },
  searchFor: function(req, res) {
    console.log('REQUESTTTTTTTTTT', req.params);
    const input = req.params.search
    spotify.searchTracks(input)
      .then(function(data) {
        let { items } = data.body.tracks;
        console.log('ITEM 1', items[0]);
        console.log('TRACKKKKKKKKKKKKKKSSSSSSSS', items)
        res.send(items)
      }, function(err) {
        console.error(err);
    });
  }
};
