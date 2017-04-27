var request = require('request');
var requestPromise = require('request-promise');
var db = require('../database/db');
var dbHelpers = require('../database/dbHelpers');
var customPlaylist = require('./customPlaylist');
var passport = require('passport');
var SpotifyStrategy = require('passport-spotify').Strategy;
var SpotifyWebApi = require('spotify-web-api-node');
var { clientID, clientSecret, callbackURL } = SpotifyAuth = require('./setup.js').spotifyAuth;
var spotifyCreditials = {
  clientId: clientID,
  clientSecret: clientSecret,
  redirectUri: callbackURL
};

module.exports = {
  authorizeSpotify: function(tokens){ 
    const { accessToken, refreshToken } = tokens;
    let spotify = new SpotifyWebApi(spotifyCreditials);
    spotify.setAccessToken(accessToken);
    spotify.setRefreshToken(refreshToken);
    return spotify;
  },
  
  getUserPlaylists: function(tokens, username, cb) {
    const spotify = this.authorizeSpotify(tokens);
    spotify.getUserPlaylists(username)
      .then(data => {
        cb(null, data.body);
      })
      .catch(err => {
        cb(err, null);
      });
  },  

  getPlaylist: function(tokens, username, playlistId, cb) {
    const spotify = this.authorizeSpotify(tokens);
    spotify.getPlaylistTracks(username, playlistId)
      .then(data => {
        cb(null, data.body);
      })
      .catch(err => {
        cb(err, null);
      });
  },

  removeFirstSong: function(playlistId) {
    let username, trackId;
    dbHelpers.getPlaylistOwner(playlistId)
    .then(owner => {
      username = owner.user_id;
      dbHelpers.getTrackByPosition(playlistId, 0)
      .then(track => {
        trackId = [{ "uri": `spotify:track:${track.song_id}`}];
        spotify.removeTracksFromPlaylist(username, playlistId, trackId)
        .then(data => {
          this.moveTracks(username, playlistId, (err, results) => {
            if(err) console.log(err)
            else {
              console.log(results)
            }
          })
        })
      })
    })
    .catch(err => {
      console.log(err);
    })
  },

  addTracksToPlaylist: function(username, playlistId, tracks) {
    return new Promise((resolve, reject) => {
      spotify.addTracksToPlaylist(username, playlistId, tracks)
      .then(data => resolve(data))
      .catch(err => reject(err));
    });
  },

  removeTracksFromPlaylist: function(username, playlistId, tracks) {
    return new Promise((resolve, reject) => {
      tracks = tracks.map(track => {
        return { 'uri': track };
      });
      spotify.removeTracksFromPlaylist(username, playlistId, tracks)
      .then(data => resolve(data.snapshot_id))
      .catch(err => reject(err));
    });
  },

<<<<<<< HEAD
    // var i1 = Math.floor(Math.random()*10);
    // var i2 = Math.floor(Math.random()*10);

    // spotify.reorderTracksInPlaylist(username, playlistId, i1, i2)
    //   .then(data => {
    //     cb(null);
    //   })
    //   .catch(err => {
    //     cb(err);
    //   });


  searchFor: function(tokens, name, filter, cb) {
    const spotify = this.authorizeSpotify(tokens);
=======
  searchFor: function(name, filter, cb) {
>>>>>>> Cleaning up reordering in spotify
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

  createPlaylist: function(tokens, userId, preferences, cb) {
    const spotify = this.authorizeSpotify(tokens);
    var date = new Date( new Date().getTime() + -7 * 3600 * 1000).toUTCString();
    var playlistName = `SoundCrowd - ${preferences.playlistName || date.slice(5, 11) + ' ' + date.slice(17, 25)}`;
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

  hasAccessToken: function(tokens) {
    const spotify = this.authorizeSpotify(tokens);
    return Boolean(spotify._credentials.accessToken);
  },

  getCurrentSong: function(tokens, cb) {
    const spotify = this.authorizeSpotify(tokens);
    const options = {
      uri: 'https://api.spotify.com/v1/me/player',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${spotify._credentials.accessToken}`
      },
      json: true
    }; 
    requestPromise(options)
      .then(info => cb(null, info))
      .catch(err => cb(err, null));    
  },

  startPlaylist: function(tokens, playlistId, cb) {
    const spotify = this.authorizeSpotify(tokens);
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
  }
};



/* * SPOTIFY PASSPORT AUTHENTICATION * */
passport.use(new SpotifyStrategy(SpotifyAuth,
  (req, accessToken, refreshToken, profile, done) => {
    
    req.session.tokens = {
      accessToken,
      refreshToken
    };
    
    const { id, display_name, email } = profile._json;
    const user = {
      id: id, 
      name: display_name || '', 
      email: email ,
      access_token: accessToken,
      refresh_token: refreshToken
    };

    db.User.findOne({where: {id: id}})
    .then(foundUser => { 
      if (!foundUser) {
        db.User.create(user)
        .then(createdUser => {
          return done(null, createdUser.dataValues);
        })
        .catch(err => console.log('User.create err: ', err));
      } else {
        foundUser.update({
          access_token: accessToken,
          refresh_token: refreshToken
        }); 
        return done(null, foundUser.dataValues);        
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
