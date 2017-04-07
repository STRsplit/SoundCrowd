var mysql = require('mysql');
var Promise = require('bluebird');
var schema = require('./schema.js')
var database = 'music';

var connection = mysql.createConnection({
  user: 'root',
  password: ''
});

var db = Promise.promisifyAll(connection, {multiArgs: true});

db.connectAsync().then(function() {
  return db.queryAsync('DROP DATABASE IF EXISTS ' + database);
}).then(function() {
  return db.queryAsync('CREATE DATABASE ' + database);
}).then(function() {
  return db.queryAsync('USE ' + database);
}).then(function() {
  return db.queryAsync(schema.session);
});