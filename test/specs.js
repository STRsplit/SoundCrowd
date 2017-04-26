var expect = require('chai').expect;
var Sequelize = require('sequelize');
var db = require('../database/db.js');
var Browser = require('zombie');

describe('Database Schema:', function() {
	it('contains a User table', function(done) {
		db.User.findAll()
		.then(data => {
			expect(data).to.exist;
			done();
		})
		.catch(err => {
			done(err);
		});
	});

	it('contains a Playlist table', function(done) {
		db.Playlist.findAll()
		.then(data => {
			expect(data).to.exist;
			done();
		})
		.catch(err => {
			done(err);
		});
	});

	it('contains a Song table', function(done) {
		db.Song.findAll()
		.then(data => {
			expect(data).to.exist;
			done();
		})
		.catch(err => {
			done(err);
		});
	});

	it('contains a Vote table', function(done) {
		db.Vote.findAll()
		.then(data => {
			expect(data).to.exist;
			done();
		})
		.catch(err => {
			done(err);
		});
	});
});

describe('Spotify Login:', function() {
	var browser = new Browser();
	before(function(done) {
		browser.visit('http://127.0.0.1:3000/login');
    browser.pressButton('Log into Spotify');
    browser.pressButton('LOG IN TO SPOTIFY', done);
	})
	it('logs in user with correct password', function(done) {

	});
})