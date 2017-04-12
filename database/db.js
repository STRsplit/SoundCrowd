const Sequelize = require('sequelize');
const dbName = 'music';
const db_config = {
  host: process.env.CDB_HOST || 'localhost',
  user: process.env.CDB_USER || 'root',
  password: process.env.CDB_PASSWORD || '',
  database: process.env.CDB_DATABASE || dbName
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

const Playlist = db.define('Playlist', {
  playlist_id: {type: Sequelize.STRING, primaryKey: true},
  user_id: Sequelize.STRING,
  name: Sequelize.STRING
}, {timestamps: false});

const Song = db.define('Song', {
  song_id: {type: Sequelize.STRING, primaryKey: true},
  playlist_id: Sequelize.STRING,
  vote_count: Sequelize.INTEGER
}, { timestamps: false });

const Vote = db.define('Vote', {
  playlist_id: Sequelize.STRING,
  song_id: Sequelize.STRING,
  user_id: Sequelize.STRING,
  session_id: Sequelize.STRING,
  vote: Sequelize.INTEGER
});

User.sync();
Playlist.sync();
Song.sync();
Vote.sync();

// User.hasMany(Playlist);
// Playlist.belongsTo(User);
// Playlist.hasMany(Song);
// Song.belongsTo(Playlist);

module.exports = {
  User: User,
  Playlist: Playlist,
  Song: Song,
  Vote: Vote
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