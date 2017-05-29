var expect = require('chai').expect;
var Sequelize = require('sequelize');
var Browser = require('zombie');
var db = require('../database/db.js');
var keys = require('../config/keys.js');

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

	beforeEach(function(done) {
		browser.visit('http://127.0.0.1:3000/auth/spotify')
		.then(function() {
		  browser.clickLink('Log in to Spotify')
		  .then(function() {
		  	done();
		  });
		})
		.catch(function(err) {
			done(err);
		});
	});

	it('does not login user with incorrect password', function(done) {
    this.timeout(10000);
    browser
    .fill('Username or email address', 'a')
    .fill('Password', 'a')
    .pressButton('Log In')
    .then(function() {
      expect(browser.query('.alert.alert-warning')).to.exist;
	    done();
	  });
	});

	it('logs in user with correct password', function(done) {
		this.timeout(10000);
    browser
    .fill('Username or email address', keys.email)
    .fill('Password', keys.password)
    .pressButton('Log In')
    .then(function() {
	    browser.pressButton('Okay')
	    .then(function() {
	    	browser.assert.success();
	    	done();
	    });
	  });
	});
});

describe('Node Server:', function() {
	console.log('Node Server')
});


