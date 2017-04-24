var request = require('request');
var requestPromise = require('request-promise');
var db = require('../database/db');
var customPlaylist = require('./customPlaylist');
var passport = require('passport');
var SpotifyStrategy = require('passport-spotify').Strategy;
var SpotifyWebApi = require('spotify-web-api-node');
var { clientID, clientSecret, callbackURL } = SpotifyAuth = require('./setup.js').spotifyAuth;
var spotify = new SpotifyWebApi({
  clientId: clientID,
  clientSecret: clientSecret,
  redirectUri: callbackURL
}); 

module.exports = {
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
    var i1 = Math.floor(Math.random()*10);
    var i2 = Math.floor(Math.random()*10);
    spotify.reorderTracksInPlaylist(username, playlistId, i1, i2)
      .then(data => {
        cb(null);
      })
      .catch(err => {
        cb(err);
      });
  },

  searchFor: function(name, filter, cb) {
    spotify.searchTracks(`${filter}:${name}`)
    .then((data) => {
      let { items } = data.body.tracks;
      cb(null, items);
    })
    .catch((err) => {
        console.error(err);
        cb(err)
      });
  },

  createPlaylist: function(userId, preferences, cb) {
    var date = new Date( new Date().getTime() + -7 * 3600 * 1000).toUTCString();
    var playlistName = 'SoundCrowd ' + date.slice(5, 11) + ' ' + date.slice(17, 25);
    spotify.createPlaylist(userId, playlistName, {public: true})
      .then((data) => {
        var newPlaylistId = data.body.id;
        spotify.getPlaylistsForCategory('mood', { limit: 50 })
          .then((info) => {
            var playlistId = customPlaylist.selectPlaylist(info.body.playlists.items, preferences.mood)
            spotify.getPlaylist('spotify', playlistId)
              .then((resp) => {
                var result = customPlaylist.selectTracks(resp, preferences.activity, userId, newPlaylistId);
                spotify.addTracksToPlaylist(userId, newPlaylistId, result.uri)
                .then((res) => console.log('added tracks'));
                cb(null, result.id);
              });
          })
      })
      .catch(err => {
        cb(err);
      });
  },

  hasAccessToken: function() {
    return Boolean(spotify._credentials.accessToken);
  },

  getCurrentSong: function(cb) {
    // const options = {
    //   uri: 'https://api.spotify.com/v1/me/player',
    //   headers: {
    //     Accept: 'application/json',
    //     Authorization: `Bearer ${spotify._credentials.accessToken}`
    //   },
    //   json: true
    // }; 
    // requestPromise(options)
    //   .then(info => cb(null, info))
    //   .catch(err => cb(err, null));    

      // For refreshing approach
      // spotify.refreshAccessToken()
      // .then(data => {
      //   // Save the access token so that it's used in future calls
      //   spotify.setAccessToken(data.body['access_token']);
      //   console.log('The access token has been refreshed!');
      // }, err => {
      //   console.log('Could not refresh access token', err);
      // });
    // }
  },

  startPlaylist: function(username, playlistId, cb) {
    // request({
    //   uri: 'https://api.spotify.com/v1/me/player/play',
    //   method: 'PUT',
    //   body: {
    //     context_uri: `spotify:playlist:${playlistId}`
    //     // context_uri: 'spotify:playlist:' + playlistId
    //   }
    // }, (err, res, body) => {
    //   if (err) {
    //     console.log('there was an error');
    //     console.log(err);
    //   } 
    //   else {
    //     console.log('there was no error');
    //     console.log(JSON.stringify(res), body);
    //   }
    // });
    console.log('this playlist', playlistId);
    if (spotify._credentials.accessToken) {
      const options = {
        uri: 'https://api.spotify.com/v1/me/player/play',
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
          Authorization: `Bearer ${spotify._credentials.accessToken}`
        },
        data: {
          context_uri: `spotify:playlist:${playlistId}`
        }
      }; 
      requestPromise(options)
        .then(info => cb(null, info))
        .catch(err => cb(err, null));
    } else {
      console.log('no spotify token');
    }
  }
};



/* * SPOTIFY PASSPORT AUTHENTICATION * */
passport.use(new SpotifyStrategy(SpotifyAuth,
  (accessToken, refreshToken, profile, done) => {

    spotify.setAccessToken(accessToken);
    spotify.setRefreshToken(refreshToken);
    
    const { id, display_name, email } = profile._json;
    const user = {
      id: id, 
      name: display_name || '', 
      email: email 
    };

    clientName = display_name;

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
/* * SPOTIFY PASSPORT AUTHENTICATION * */
