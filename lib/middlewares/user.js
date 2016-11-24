'use strict';

// var utils = require('../utils');
// var config = require('../config');
const links = require('../links');

function response(req, res) {
	return res.redirect(links.login({ redirect: req.originalUrl }));
}

exports.required = function(req, res, next) {

	if (!res.locals.authenticated) {
		return response(req, res);
	}

	next();
};

exports.admin = function(req, res, next) {

	if (!res.locals.userIsAdmin) {
		return response(req, res);
	}

	next();
};

exports.moderator = function(req, res, next) {

	if (!res.locals.userIsModerator) {
		return response(req, res);
	}

	next();
};
