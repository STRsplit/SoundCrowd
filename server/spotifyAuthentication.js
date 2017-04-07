const setup = require('./setup');
const db = require('../database/db');
const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;


passport.use(new SpotifyStrategy(setup.spotifyAuth,
  (accessToken, refreshToken, profile, done) => {
    console.log('SPOTIFY PROFILE OBJECT RETURNED: ', profile);
    
    const { id, display_name, email } = profile._json;
    const user = {
      id: id, 
      name: display_name || '', 
      email: email 
    };

    db.User.findOne({where: {id: id}})
    .then(result => {
      console.log('result', result);
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

