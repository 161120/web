'use strict';

const express = require('express');
/*eslint new-cap:1*/
const route = module.exports = new express.Router();
const userMiddleware = require('../middlewares/user');
// const Data = require('../data');

//index

route.get('/admin', userMiddleware.moderator, function(req, res, next) {

	res.viewdata.set({
		inactiveQuestions: {
			source: 'questions',
			params: {
				where: {
					locale: res.locals.questionsLocale,
					status: { $ne: 'active' }
				},
				limit: 10,
				sort: 'createdAt'
			}
		}
	});

	res.viewdata.get(res.locals, function(error) {
		if (error) {
			return next(error);
		}
		res.render('admin');
	});
});
