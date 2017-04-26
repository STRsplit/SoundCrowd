var expect = require('chai').expect;
var Sequelize = require('sequelize');
var db = require('../database/db.js');

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
});