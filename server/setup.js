module.exports = {
  spotifyAuth: {
    clientID: process.env.SPOTIFY_CLIENT_ID || '169b6e558aea4f4a8725d2ad38382923',
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET || '6c36dcc5feca4ac7bc2f86523af306d8',
    callbackURL: process.env.SPOTIFY_CALLBACK_URL || 'http://localhost:3000/auth/spotify/callback'
  }
};


/* *  HEROKU PIPELINE TEST  * */
/* * RESERVE FOR DEPLOYMENT * *

process.env.SPOTIFY_CLIENT_ID = '169b6e558aea4f4a8725d2ad38382923';
process.env.SPOTIFY_CLIENT_SECRET = '6c36dcc5feca4ac7bc2f86523af306d8';
process.env.SITE_URL = 'http://localhost:3000/'
process.env.MONGOD_URI = 'mongodb://localhost/so-me-music'

* * RESERVE FOR DEPLOYMENT * */