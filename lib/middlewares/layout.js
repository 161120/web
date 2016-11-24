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

	const limitPastDate = new Date();
	limitPastDate.setDate(limitPastDate.getDate() - 30);
	// for cache
	const gt = parseInt(limitPastDate.getTime() / 1000000) * 1000000;

	res.viewdata.set({
		popularQuestions: {
			source: 'questions',
			params: {
				where: {
					locale: res.locals.questionsLocale,
					status: 'active',
					createdAt: {
						$gt: gt
					}
				},
				limit: 3,
				sort: '-countViews'
			}
		}
	});

	next();
};
