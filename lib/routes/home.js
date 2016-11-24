'use strict';

const express = require('express');
/*eslint new-cap:1*/
const route = module.exports = express.Router();
const Data = require('../data');
const utils = require('../utils');
const _ = utils._;
const links = require('../links');

//index

route.get('/', function(req, res, next) {

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
		}
	});

	res.viewdata.get(res.locals, function(error) {
		if (error) {
			return next(error);
		}
		res.render('index');
	});
});

