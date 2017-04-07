var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var db = require('../database/db');
var User = require('../database/users');
var app = express();
var spotify = require('./spotify');

app.use(express.static(__dirname + '/../public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/search/:search', spotify.searchFor);


app.get('*', function(req, res) {
	res.sendFile(path.resolve(__dirname, '../public', 'index.html'));
});


app.listen(3000, function() {
  console.log('listening on port 3000!');
});