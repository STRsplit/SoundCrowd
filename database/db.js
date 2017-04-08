const Sequelize = require('sequelize');
const db = new Sequelize('music', 'root', '');

const User = db.define('User', {
  id: {type: Sequelize.STRING, primaryKey: true},
  name: Sequelize.STRING,
  email: Sequelize.STRING
  }, 
  {
    timestamps: false
  } 
);

// creates these tables in MySQL if they don't already exist. Pass in {force: true}
// to drop any existing user and message tables and make new ones.
User.sync();

module.exports = {
  User: User
};




/* * ORIGINAL * *
var mysql = require('mysql');
var Promise = require('bluebird');
var schema = require('./schema.js')
var database = 'music';

var connection = mysql.createConnection({
  user: 'root',
  password: 'root'
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
})
.then(() => db.queryAsync(schema.users));

module.exports = db;

* * ORIGINAL * */