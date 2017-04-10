var setup = require('./setup.js');
var db = require('../database/db');
var passport = require('passport');
var SpotifyStrategy = require('passport-spotify').Strategy;
var SpotifyWebApi = require('spotify-web-api-node');
// var spotify = new SpotifyWebApi({ 
//   clientId : '169b6e558aea4f4a8725d2ad38382923',
//   clientSecret : '6c36dcc5feca4ac7bc2f86523af306d8',
//   redirectUri : 'http://localhost:3000/auth/spotify/callback'
// });
var spotify;
var SpotifyAuth = require('./setup.js').spotifyAuth;
if(!process.env.SPOTIFY_CLIENT_ID){
  console.log(SpotifyAuth);
  spotify = new SpotifyWebApi({
    clientId: SpotifyAuth.clientID,
    clientSecret: SpotifyAuth.clientSecret,
    redirectUri: SpotifyAuth.callbackURL
  });
} else {
  console.log(SpotifyAuth);
  spotify = new SpotifyWebApi({ 
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      redirectUri: process.env.SITE_URL
  });
}
module.exports = {
  /*
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
  */
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
  moveTrack: function(username, playlistId, cb) {
    // var options = { 'range_length': 2 };
    spotify.reorderTracksInPlaylist(username, playlistId, 1, 3)
      .then(data => {
        cb(null);
      })
      .catch(err => {
        cb(err);
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
  },
  test: (req, res) => {
    spotify.getPlaylistsForCategory('party')
    .then((data) => {
      console.log('test data: ', data.body.playlists.items);
      res.send(data.body.playlists.items);
    }, (err) => {
      console.log('error: ', err);
    });
  }
};


passport.use(new SpotifyStrategy(setup.spotifyAuth,
  (accessToken, refreshToken, profile, done) => {

    spotify.setAccessToken(accessToken);
    spotify.setRefreshToken(refreshToken);
    
    const { id, display_name, email } = profile._json;
    const user = {
      id: id, 
      name: display_name || '', 
      email: email 
    };

    db.User.findOne({where: {id: id}})
    .then(result => {
      if (!result) {
        db.User.create(user)
        .then(result => {
          return done(null, result.dataValues);
        })
        .catch(err => console.log('User.create err: ', err));
      } else {
        return done(null, result.dataValues);        
      }    
    })
    .catch(err => {
      console.log('spotifyAuthentication catch error: ', err);      
    });    
  }) 
);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  db.User.findOne({where: {id: id}})
  .then(result => {
    return done(null, result.dataValues);
  })
  .catch(err => {
    console.log('passport.deserializeUser err: ', err);
  });
});


