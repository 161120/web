'use strict';

// var utils = require('../utils');
// var config = require('../config');

function response(req, res) {
	return res.redirect(res.locals.links.login({ redirect: req.originalUrl }));
}

exports.required = function(req, res, next) {

	if (!req.authenticated) {
		return response(req, res);
	}

	next();
};

exports.admin = function(req, res, next) {

	if (!req.userIsAdmin) {
		return response(req, res);
	}

	next();
};

exports.moderator = function(req, res, next) {

	if (!req.userIsModerator) {
		return response(req, res);
	}

	next();
};
