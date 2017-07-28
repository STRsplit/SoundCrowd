var request = require('request');
var requestPromise = require('request-promise');
var db = require('../database/db');
var dbHelpers = require('../database/dbHelpers');
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

  addTracksToPlaylist: function(tokens, username, playlistId, tracks) {
    const spotify = this.authorizeSpotify(tokens);
    return new Promise((resolve, reject) => {
      spotify.addTracksToPlaylist(username, playlistId, tracks)
      .then(data => resolve(data))
      .catch(err => reject(err));
    });
  },

  removeTracksFromPlaylist: function(tokens, username, playlistId, tracks) {
    const spotify = this.authorizeSpotify(tokens);
    return new Promise((resolve, reject) => {
      tracks = tracks.map(track => {
        return { 'uri': track };
      });
      spotify.removeTracksFromPlaylist(username, playlistId, tracks)
      .then(data => resolve(data.snapshot_id))
      .catch(err => reject(err));
    });
  },

  searchFor: function(tokens, name, filter, cb) {
    const spotify = this.authorizeSpotify(tokens);
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
