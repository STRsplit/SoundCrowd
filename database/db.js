var mongoose = require('mongoose');
var User = require('./users');
 
mongoose.connect('mongodb://localhost/some');

var db = mongoose.connection;
db.on('error', function(error) {
  console.log('connection error: ', error);
});
db.once('open', function() {
  console.log('We are connected to the So Me database');
  db.dropDatabase().then(function() {
  	var start = new User({
  		playlist: [],
		  spotifyid: 'test',
		  email: 'test',
		  name: 'test'
  	}).save();
  });
});

module.exports = db;