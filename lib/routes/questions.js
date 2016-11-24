'use strict';

const express = require('express');
/*eslint new-cap:1*/
const route = module.exports = new express.Router();
const userMiddleware = require('../middlewares/user');
const Data = require('../data');
const utils = require('../utils');
const _ = utils._;
const links = require('../links');


route.get('/q/:slug', function(req, res, next) {

	const data = _.assign({}, res.locals.currentCulture, { slug: req.params.slug });

	const id = Data.api.Question.createId(data);

	res.viewdata.set({
		question: {
			source: 'question',
			params: {
				where: {
					_id: id
				}
			}
		},
		answers: {
			source: 'answers',
			params: {
				where: {
					questionId: id
				}
			}
		}
	});

	res.viewdata.get(res.locals, function(error) {
		if (error) {
			return next(error);
		}
		if (!res.locals.question) {
			return res.redirect(links.home());
		}
		res.render('question');
	});
});

route.get('/questions/:id/edit', userMiddleware.moderator, function(req, res, next) {

	res.viewdata.set({
		question: {
			params: {
				where: {
					_id: req.params.id
				}
			}
		},
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
		res.render('edit');
	});
});
