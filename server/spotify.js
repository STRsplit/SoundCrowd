var request = require('request');
var requestPromise = require('request-promise');
var db = require('../database/db');
var passport = require('passport');
var SpotifyStrategy = require('passport-spotify').Strategy;
var SpotifyWebApi = require('spotify-web-api-node');
var { clientID, clientSecret, callbackURL } = SpotifyAuth = require('./setup.js').spotifyAuth;
var spotify = new SpotifyWebApi({
  clientId: clientID,
  clientSecret: clientSecret,
  redirectUri: callbackURL
});
var userId;

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
    spotify.getPlaylistTracks(username, playlistId)
      .then(data => {
        cb(null, data.body);
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
    spotify.getPlaylistsForCategory('mood')
    .then((data) => {
      res.send(data.body.playlists.items);
    }, (err) => {
      console.log('error: ', err);
    });
  },
  // getPlaylist: (req, res) => {
  //   db.Playlist.findAll()
  //   .then((result) => {
  //     res.send(result);
  //   });
  // },
  createPlaylist: (req, res) => {
    console.log('post ', req.body.number);
    console.log('create playlist ', userId);
    spotify.createPlaylist(userId, 'Playlist ' + req.body.number, {public: false})
    .then((data) => {
      console.log('created Playlist ' + req.body.number);
    }, (err) => {
      console.log('error: ', err);
    });
  },

  getCurrentSongDetails: (req, res) => {
    if (spotify._credentials.accessToken) {
      const options = {
        uri: 'https://api.spotify.com/v1/me/player',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${spotify._credentials.accessToken}`
        },
        json: true
      }; 
      requestPromise(options)
      .then(info => {
        res.send(info);
      })
      .catch(err => console.log('getCurrentSongDetails err: ', err));
    } else {
      /* FUTURE TODO: Should logs out the user when access token expired or server restarted.
      // For logout
      req.logOut();
      req.session.destroy();

      // For refreshing approach
      spotify.refreshAccessToken()
      .then(data => {
        // Save the access token so that it's used in future calls
        spotify.setAccessToken(data.body['access_token']);
        console.log('The access token has been refreshed!');
      }, err => {
        console.log('Could not refresh access token', err);
      });
      */
    }
  }
};




passport.use(new SpotifyStrategy(SpotifyAuth,
  (accessToken, refreshToken, profile, done) => {

    spotify.setAccessToken(accessToken);
    spotify.setRefreshToken(refreshToken);
    console.log(spotify);
    
    const { id, display_name, email } = profile._json;
    const user = {
      id: id, 
      name: display_name || '', 
      email: email 
    };

    userId = id;

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


