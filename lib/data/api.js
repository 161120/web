'use strict';

const ActionheroClient = require('actionhero-client');
const client = new ActionheroClient();
const logger = require('../logger');
const utils = require('../utils');
const Promise = utils.Promise;

function callAction(name, params) {
	return new Promise((resolve, reject) => {
		client.actionWithParams(name, params, (error, apiResponse, delta) => {
			if (error) {
				return reject(error);
			}
			logger.info('action', name, 'delta=', delta);
			resolve(apiResponse.data);
		});
	});
}

const api = module.exports = {
	stop: function() {
		client.disconnect();
	},
	action: callAction,
	createQuestion: function(data) {
		return callAction('question.create', data);
	},
	updateQuestion: function(data) {
		return callAction('question.update', data);
	},
	question: function(data) {
		return callAction('question.one', data);
	},
	questions: function(data) {
		return callAction('question.list', data);
	},
	createAnswer: function(data) {
		return callAction('answer.create', data);
	},
	updateAnswer: function(data) {
		return callAction('answer.update', data);
	},
	answer: function(data) {
		return callAction('answer.one', data);
	},
	answers: function(data) {
		return callAction('answer.list', data);
	}
};

client.connect({
	host: process.env.API_HOST || 'localhost',
	port: process.env.API_PORT || 5000,
	delimiter: '\n'
}, function() {
	logger.warn('Client connected', client.details);
});

client.on('error', function(err, data) {
	logger.error(err, data);
});

client.on('end', function() {
	logger.warn('Client: Connection ended');
});

client.on('timeout', function(err, request) {
	logger.error(request + ' timed out');
});
