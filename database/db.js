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

// const Vote = db.define('Vote', {
//   songId: 
// });

// creates these tables in MySQL if they don't already exist. Pass in {force: true}
// to drop any existing user and message tables and make new ones.
User.sync();

module.exports = {
  User: User
};



/* * ADD THIS AT LINE 1 DURING SETUP, COMMENT IT BACK AFTER DB IS CREATED * * 
const mysql = require('mysql');
const Promise = require('bluebird');
const dbName = 'music';

const connection = mysql.createConnection({
  user: 'root',
  password: ''
});

const database = Promise.promisifyAll(connection, {multiArgs: true});

database.connectAsync()
.then(() => {
  return database.queryAsync('DROP DATABASE IF EXISTS ' + dbName);
})
.then(() => {
  return database.queryAsync('CREATE DATABASE ' + dbName);
})
.then(() => {
  return database.queryAsync('USE ' + dbName);
});
* * ADD THIS AT LINE 1 DURING SETUP * */