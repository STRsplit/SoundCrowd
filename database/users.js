var mongoose = require('mongoose');
var db = require('./db');

var userSchema = mongoose.Schema({
  playlist: Array,
  spotifyid: String,
  email: String,
  name: String
});

var User = mongoose.model('user', userSchema);

module.exports = User;