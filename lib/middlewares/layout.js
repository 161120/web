'use strict';

// var utils = require('../utils');
// var config = require('../config');

module.exports = function(req, res, next) {

	res.locals.questionTypes = {
		tops: {
			name: res.__('tops')
		},
		features: {
			name: res.__('features')
		}
	};

	next();
};
