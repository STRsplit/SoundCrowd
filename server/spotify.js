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
var mood;
var activity;
var newPlaylistId;
var href; 

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
    spotify.reorderTracksInPlaylist(username, playlistId, 1, 3)
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

getCategory: (req, res) => {
    spotify.getPlaylistsForCategory('mood', { limit: 50 })
    .then((data) => {
      var playlists = data.body.playlists.items;
      var names = [];
      var chosen = [];
      var playlistId;
      for (var i = 0; i < playlists.length; i++) {
        names.push(playlists[i].name.split(' '));
        names[i].unshift(i);
      }
      if (mood === 'Happy') {
        for (var j = 0; j < names.length; j++) {
          for (var k = 0; k < names[j].length; k++) {
            if (names[j][k] === 'Good' || names[j][k] === 'Happy') {
              chosen.push(names[j]);
            }
          }
        } 
      } else if (mood === 'Calm' || mood === '') {
        for (j = 0; j < names.length; j++) {
          for (k = 0; k < names[j].length; k++) {
            if (names[j][k] === 'Relax' || names[j][k] === 'Coffeehouse' ||
                names[j][k] === 'Soft' || names[j][k] === 'Chill' || 
                names[j][k] === 'Break' || names[j][k] === 'Smooth') {
              chosen.push(names[j]);
            }
          }
        } 
      } else if (mood === 'Sad') {
        for (j = 0; j < names.length; j++) {
          for (k = 0; k < names[j].length; k++) {
            if (names[j][k] === 'Dark' || names[j][k] === 'Melancholia' || names[j][k] === 'Loss') {
              chosen.push(names[j]);
            }
          }
        } 
      } else if (mood === 'Focused') {
        for (j = 0; j < names.length; j++) {
          for (k = 0; k < names[j].length; k++) {
            if (names[j][k] === 'Brain') {
              chosen.push(names[j]);
            }
          }
        } 
      } else if (mood === 'Excited') {
        for (j = 0; j < names.length; j++) {
          for (k = 0; k < names[j].length; k++) {
            if (names[j][k] === 'Free') {
              chosen.push(names[j]);
            }
          }
        } 
      }
      var num = Math.floor(Math.random() / (1 / chosen.length));
      num = chosen[num][0];

      spotify.getPlaylist('spotify', playlists[num].id)
      .then((data) => {
        var tracks = data.body.tracks.items;
        var result = {uri: [], link: href};
        if (activity === 'Exercising' || activity === 'Partying') {
          for (var i = 0; i < tracks.length; i++) {
            if (tracks[i].track.popularity < 60) {
              tracks[i] = undefined;
            }
          }
        } else if (activity === 'Studying' || activity === 'Chilling' || activity === 'Driving') {
          for (i = 0; i < tracks.length; i++) {
            if (tracks[i].track.popularity < 30) {
              tracks[i] = undefined;
            }
          }
        }
        for (i = 0; i < tracks.length; i++) {
          if (result.uri.length === 90) {
            break;
          }
          if (tracks[i] !== undefined) {
            result.uri.push(tracks[i].track.uri);
          }
        }
        spotify.addTracksToPlaylist(userId, newPlaylistId, result.uri)
        .then((data) => {
          console.log('added tracks');
        }, function(err) {
          console.log('add tracks error: ', err);
        });
        res.send(result);
      });
    }, (err) => {
      console.log('error: ', err);
    });
  },

  setPreferences: function(req, res) {
    mood = req.body.mood;
    activity = req.body.activity;
    console.log('this is songs ', mood);
    console.log('this is songs ', activity);
    res.sendStatus(201);
  },

  getName: (req, res) => {
    res.send(req.user.name);
  },

  findPlaylist: (req, res) => {
    db.Playlist.findAll()
    .then((result) => {
      // var obj = {db: result, user: clientName};
      res.send(result);
    })
    .catch((err) => {
      console.log('findPlaylist error: ', err);
    });
  },

  createPlaylist: (req, res) => {
    var playlistName = 'Playlist ' + req.body.number;
    spotify.createPlaylist(userId, playlistName, {public: false})
    .then((data) => {
      newPlaylistId = data.body.id;
      db.Playlist.create({
        playlist_id: newPlaylistId,
        user_id: userId,
        name: playlistName
      });
      href = data.body.external_urls.spotify;
      console.log('created Playlist :', data.body.external_urls.spotify);
      res.sendStatus(201);
    }, (err) => {
      console.log('error: ', err);
      res.sendStatus(404);
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

    clientName = display_name;
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


