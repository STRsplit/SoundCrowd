var express = require('express');
var dbHelpers = require('../../database/dbHelpers');
var spotify = require('../spotify');
var handler = require('../requestHandler');

module.exports = io => {
  var router = express.Router();

  router.get('/user', function(req, res) {
    res.send(req.user);
  });

  router.get('/currently_playing/:playlist', function(req, res) {
    const playlistId = req.params.playlist; 
    const userTokens = req.session.tokens;

    dbHelpers.getPlaylistOwner(playlistId)
    .then(playlistOwner => {
      if (!req.user || playlistOwner.dataValues.user_id !== req.user.id) {
        dbHelpers.getUser(playlistOwner.dataValues.user_id)
        .then(owner => {
          const ownerTokens = {
            accessToken: owner.access_token,
            refreshToken: owner.refresh_token
          };
          spotify.getCurrentSong(ownerTokens, function(err, info) {
            if (err) res.status(err.statusCode).send(err);
            else res.status(200).send(info);
          });
        })
      } else {
        if (spotify.hasAccessToken(userTokens)) {   
          spotify.getCurrentSong(userTokens, function(err, info) {
            if (err) res.status(err.statusCode).send(err);
            else res.status(200).send(info);
          });   
        } else {
          req.logout();
          req.session.destroy();
          res.status(401).send('User is not logged in.');    
        }
      }
    })
    .catch(err => console.log('router.js > /currently-playing/:playlist > getPlaylistOwner error: ', err));    
  });

  router.get('/playlists/:playlist', function(req, res) {
    var playlist = req.params.playlist;
    dbHelpers.getPlaylist(playlist)
      .then(function(tracks) {
        if (tracks.length) {
          dbHelpers.getPlaylistOwner(playlist)
            .then(function(owner) {
                res.status(200).send({ owner: owner.user_id, tracks: tracks });
            });
        } else {
          if (req.isAuthenticated()) {
            spotify.getPlaylist(req.session.tokens, req.user.id, playlist, function(err, tracks) {
              if (err) res.status(err.statusCode).send(err);
              else {
                dbHelpers.savePlaylist(playlist, req.user.id, tracks)
                  .then(function(savedTracks) {
                    res.status(200).send({ owner: req.user.id, tracks: savedTracks });
                  })
                  .catch(err => {
                    res.status(err.statusCode).send(err);
                  });
              }
            });
          } else {
            res.sendStatus(404);
          }
        }
      });
  });

  router.get('/search', function(req, res) {
    const { name, filter, playlist } = req.query;
    dbHelpers.getPlaylistOwner(playlist)
    .then(playlistOwner => {
      const { user_id } = playlistOwner.dataValues
      if (!req.user || user_id !== req.user.id) {
        dbHelpers.getUser(user_id)
        .then(owner => {
          const ownerTokens = {
            accessToken: owner.access_token,
            refreshToken: owner.refresh_token
          };
          spotify.searchFor(ownerTokens, name, filter, function(err, items) {
            if(err) res.status(err.statusCode).send(err);
            else res.status(200).send(items);
          });
        })
      } else {
        spotify.searchFor(req.session.tokens, name, filter, function(err, items) {
          if(err) res.status(err.statusCode).send(err);
          else res.status(200).send(items);
        });
      }
    })
    .catch(err => console.log('router.js > /search > getPlaylistOwner error: ', err)); 
  });

  router.get('/validate/:playlist', function(req, res) {
    dbHelpers.findPlaylist(req.params.playlist)
    .then(playlist => {
      if (playlist) {
        res.status(200).send(true);
      } else {
        res.status(200).send(false);
      }
    })
    .catch(err => res.sendStatus(500));
  });

  router.post('/vote', function(req, res) {
    handler.validateVote(req, res);
    spotify.moveTrack(req.session.tokens, req.user.id, req.body.playlistId, function(err) {
      if (err) console.log(err);
    });
    res.sendStatus(201);
  });

  router.post('/tracks', function(req, res) {
    var track = req.body.track;
    var playlistId = track.playlist_id;
    dbHelpers.addTrack(track, function(err, success) {
      if (err) res.status(err.statusCode).send(err);
      else {
        io.sockets.in(playlistId).emit('addTrack', track);
        dbHelpers.reorderPlaylist(playlistId)
        .then(tracks => {
          if (tracks) {
            io.sockets.in(playlistId).emit('updatePlaylist', tracks);
          } else {
            res.status(500).send('error adding song');
          }
        });
        res.sendStatus(201);
      }
    });
  });

  router.get('/verify_user', handler.verifyUser);
  
  return router;
}


