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
        var result = [];
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
          if (result.length === 90) {
            break;
          }
          if (tracks[i] !== undefined) {
            result.push(tracks[i].track.uri);
          }
        }
        spotify.addTracksToPlaylist(userId, newPlaylistId, result)
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
  findPlaylist: (req, res) => {
    db.Playlist.findAll()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log('findPlaylist error: ', err);
    });
  },
  createPlaylist: (req, res) => {
    console.log('post ', req.body.number);
    console.log('create playlist ', userId);
    var playlistName = 'Playlist ' + req.body.number;
    spotify.createPlaylist(userId, playlistName, {public: false})
    .then((data) => {
      newPlaylistId = data.body.id;
      db.Playlist.create({
        playlist_id: newPlaylistId,
        user_id: userId,
        name: playlistName
      });
      console.log('created Playlist :', data.body.id);
      res.sendStatus(201);
    }, (err) => {
      console.log('error: ', err);
      res.sendStatus(404);
    });
  }
};


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


