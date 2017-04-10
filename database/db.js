const Sequelize = require('sequelize');
const db_config = {
  host: process.env.CDB_HOST || 'localhost',
  user: process.env.CDB_USER || 'root',
  password: process.env.CDB_PASSWORD || '',
  database: process.env.CDB_DATABASE || 'music'
};

const { host, user, password, database } = db_config;

const db = new Sequelize(database, user, password, {
  host: host,
  dialect: 'mysql',
  pool:{
    max: 5,
    min: 0,
    idle: 10000
  }
});

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