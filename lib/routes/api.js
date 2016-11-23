'use strict';

const express = require('express');
/*eslint new-cap:1*/
const route = module.exports = express.Router();
const userMiddleware = require('../middlewares/user');
const api = require('../data').api;

//index

route.post('/api/questions', userMiddleware.moderator, function(req, res, next) {
	const links = req.locals.links;

	req.body.userId = req.user.id;

	api.createQuestion(req.body)
		.then((result) => {
			res.send(result);
		}, next);

});

route.put('/api/questions/:id', userMiddleware.moderator, function(req, res, next) {
	const links = req.locals.links;
	req.body.id = req.params.id;

	api.updateQuestion(req.body)
		.then((result) => {
			res.send(result);
		}, next);

});

route.post('/api/questions/:id/answers', userMiddleware.required, function(req, res, next) {
	const links = req.locals.links;
	const qId = req.params.id;

	req.body.userId = req.user.id;
	req.body.questionId = qId;

	api.createAnswer(req.body)
		.then((result) => {
			res.send(result);
		}, next);

});

route.put('/api/questions/:qid/answers/:id', userMiddleware.required, function(req, res, next) {
	const links = req.locals.links;

	req.body.id = req.params.id;
	req.body.questionId = req.params.qid;

	api.updateAnswer(req.body)
		.then((result) => {
			res.send(result);
		}, next);

});

route.post('/api/questions/:qid/answers/:aid/votes', userMiddleware.required, function(req, res, next) {
	const links = req.locals.links;

	req.body.answerId = req.params.aid;
	req.body.questionId = req.params.qid;

	api.createVote(req.body)
		.then((result) => {
			res.send(result);
		}, next);

});
