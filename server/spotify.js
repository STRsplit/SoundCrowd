var SpotifyWebApi = require('spotify-web-api-node');
// var spotify = new SpotifyWebApi({ 
//   clientId : '169b6e558aea4f4a8725d2ad38382923',
//   clientSecret : '6c36dcc5feca4ac7bc2f86523af306d8',
//   redirectUri : 'http://localhost:3000/auth/spotify/callback'
// });
var SpotifyAuth = require('./setup.js');
if(!process.env.SPOTIFY_CLIENT_ID){
  var spotify = new SpotifyWebApi(SpotifyAuth);
} else {
  var spotify = new SpotifyWebApi({ 
      clientID: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      redirectUri: process.env.SITE_URL
  });
}
module.exports = {
  authenticate: function(code, cb) {
    spotify.authorizationCodeGrant(code)
    .then(function(data) {
      spotify.setAccessToken(data.body.access_token);
      spotify.setRefreshToken(data.body.refresh_token);
      cb(null);
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
  const { name, filter } = req.query

  spotify.searchTracks(`${filter}:${name}`)
  .then(function(data) {
    let { items } = data.body.tracks;
    res.send(items)
  }, function(err) {
      console.error(err);
    });
  }
};
