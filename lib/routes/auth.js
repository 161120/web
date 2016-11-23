'use strict';

var express = require('express');
var passport = require('../passport');
var utils = require('../utils');
var route = module.exports = new express.Router();

//google

route.get('/login', function(req, res) {
	res.locals.title = res.__('login');
	res.locals.site.title = res.locals.title + ' | ' + res.locals.config.name;
	res.locals.redirectUrl = req.query.redirectUrl || req.query.redirect || '/';
	res.cookie('loginurl', res.locals.redirectUrl, { maxAge: 1000 * 60 * 10 });
	res.render('login');
});

function privateCache(req, res, next) {
	utils.maxage(res, 0);
	next();
}

// GET /auth/google
route.get('/auth/google', privateCache,
	passport.authenticate('google', { scope: ['profile', 'email'] }));

// GET /auth/google/callback
route.get('/auth/google/callback', privateCache,
	passport.authenticate('google', {
		failureRedirect: '/login'
	}),
	function(req, res) {
		res.redirect(req.cookies.loginurl || '/');
	});

// GET /auth/facebook
route.get('/auth/facebook', privateCache,
	passport.authenticate('facebook', {
		scope: ['public_profile', 'email']
	}));

// GET /auth/facebook/callback
route.get('/auth/facebook/callback', privateCache,
	passport.authenticate('facebook', {
		failureRedirect: '/login'
	}),
	function(req, res) {
		res.redirect(req.cookies.loginurl || '/');
	});

route.get('/logout', privateCache, function(req, res) {
	req.logout();
	res.redirect('/');
});
