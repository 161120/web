'use strict';

const env = require('./env');
const passport = module.exports = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const config = require('./config');
const Accounts = require('./data/accounts');

passport.serializeUser(function(user, done) {
	// console.log('serializeUser');
	// console.log(user);
	return done(null, user.id.toString());
});

passport.deserializeUser(function(id, done) {
	Accounts.users.getById(id)
		.then(function(user) {
			done(null, user);
		}, done);
});

passport.use(new FacebookStrategy({
		clientID: env.facebook.clientId,
		clientSecret: env.facebook.clientSecret,
		callbackURL: 'http://' + config.host + '/auth/facebook/callback',
		enableProof: false,
		profileFields: ['id', 'name', 'first_name', 'last_name', 'link', 'gender', 'locale', 'picture']
	},
	function(accessToken, refreshToken, profile, done) {
		// var accessData = {
		//  accessToken: accessToken,
		//  refreshToken: refreshToken
		// };
		process.nextTick(function() {
			profile.id = profile.id.toString();
			Accounts.login('social', profile)
				.then(function(userId) {
					return Accounts.users.getById(userId)
						.then(function(user) {
							return done(null, user);
						});
				}).catch(done);
		});
	}
));
