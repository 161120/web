'use strict';

const express = require('express');
/*eslint new-cap:1*/
const route = module.exports = express.Router();
const userMiddleware = require('../middlewares/user');
const utils = require('../utils');
const Promise = utils.Promise;
const _ = utils._;
const api = require('../data').api;
const links = require('../links');
const cloudinary = require('../cloudinary');
const slug = require('slug');
const config = require('../config');
const logger = require('../logger');

function send(req, res, data, error, statusCode, action) {
	if (error) {
		logger.error('api error' + error.message, error);
		error.message = error.message || 'Unknown error';
		statusCode = statusCode || error.statusCode || 400;
	} else {
		statusCode = statusCode || 200;
		action = action || { message: 'Success', type: 'message' };
	}
	res
		.status(statusCode)
		.send({
			data: data,
			action: action,
			error: error
		});
}

function filterData(data) {
	for (var prop in data) {
		if (~[null, undefined, '', '---'].indexOf(data[prop])) {
			delete data[prop];
		}
	}
	return data;
}

//index

route.post('/api/questions', userMiddleware.moderator, function(req, res, next) {

	const data = filterData(req.body);
	const culture = res.locals.currentCulture;
	data.userId = req.user.id;
	data.country = culture.country;
	data.lang = culture.lang;
	delete data.status;

	const imageUrl = data.imageUrl;
	delete data.imageUrl;

	const imagePublicId = (config.nick + '/' + slug(data.shortTitle || data.title)).toLowerCase();

	new Promise((resolve, reject) => {
			cloudinary.v2.uploader.upload(imageUrl, { public_id: imagePublicId }, (error, result) => {
				if (error) {
					return reject(error);
				}

				data.imageId = result.public_id + '.' + result.format;
				data.imageSource = 'cloudinary';

				api.question.create(data).then(resolve, reject);

			});
		})
		.then((question) => {
			send(req, res, question, null, 201, {
				type: 'redirect',
				url: links.q(question.slug)
			});
		})
		.catch((error) => {
			send(req, res, null, error);
		});

});

route.put('/api/questions/:id', userMiddleware.moderator, function(req, res, next) {

	const data = filterData(_.clone(req.body));
	data.id = req.params.id;
	// const culture = res.locals.currentCulture;
	// data.userId = req.user.id;
	// data.country = culture.country;
	// data.lang = culture.lang;

	for (var prop in req.body) {
		// null value
		if (req.body[prop] === '---') {
			data[prop] = null;
		}
	}

	function uploadImage(question) {
		if (!data.imageUrl) {
			return Promise.resolve();
		}
		const imageUrl = data.imageUrl;
		delete data.imageUrl;

		const imagePublicId = (config.nick + '/' + question.slug).toLowerCase();

		return new Promise((resolve, reject) => {
			cloudinary.v2.uploader.upload(imageUrl, { public_id: imagePublicId }, (error, result) => {
				if (error) {
					return reject(error);
				}

				data.imageId = result.public_id + '.' + result.format;
				data.imageSource = 'cloudinary';

				resolve();
			});
		})
	}

	api.question.one({ where: { _id: data.id } })
		.then((question) => {
			if (!question) {
				return Promise.reject(new Error('No question'));
			}
			return uploadImage(question)
				.then(() => {
					console.log('updating question', data);
					return api.question.update(data);
				});
		})
		.then((question) => {
			send(req, res, question);
		})
		.catch((error) => {
			send(req, res, null, error);
		});

});

route.post('/api/questions/:id/answers', userMiddleware.required, function(req, res, next) {

	const data = filterData(req.body);

	data.userId = req.user.id;
	data.questionId = req.params.id;

	api.answer.create(data)
		.then((result) => {
			send(req, res, result);
		})
		.catch((error) => {
			send(req, res, null, error);
		});

});

route.put('/api/questions/:qid/answers/:id', userMiddleware.required, function(req, res, next) {

	const data = filterData(req.body);

	data.id = req.params.id;
	data.questionId = req.params.qid;

	api.answer.update(data)
		.then((result) => {
			send(req, res, result);
		})
		.catch((error) => {
			send(req, res, null, error);
		});

});

route.post('/api/questions/:qid/answers/:aid/votes', userMiddleware.required, function(req, res, next) {

	const data = filterData(req.body);

	data.userId = req.user.id;
	data.questionId = req.params.qid;
	data.answerId = req.params.aid;

	api.vote.create(data)
		.then((result) => {
			send(req, res, result);
		})
		.catch((error) => {
			send(req, res, null, error);
		});

});
