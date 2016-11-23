'use strict';

const express = require('express');
/*eslint new-cap:1*/
const route = module.exports = express.Router();
// const Data = require('../data');

//index

route.get('/', function(req, res, next) {

	const limitPastDate = new Date();
	limitPastDate.setDate(limitPastDate.getDate() - 30);
	// for cache
	const gt = parseInt(limitPastDate.getTime() / 1000000) * 1000000;
	// console.log(limitPastDate.getTime(), gt);
	res.viewdata.set({
		latestQuestions: {
			source: 'questions',
			params: {
				where: {
					locale: res.locals.questionsLocale,
					status: 'active'
				},
				limit: 10,
				sort: '-createdAt'
			}
		},
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

	res.viewdata.get(res.locals, function(error) {
		if (error) {
			return next(error);
		}
		res.render('index');
	});
});
