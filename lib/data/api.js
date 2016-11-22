'use strict';

const logger = require('../logger');
const utils = require('../utils');
const Promise = utils.Promise;
const request = require('request');

function callAction(name, params) {
	return new Promise((resolve, reject) => {
		request({ url: 'http://localhost:8080/api/' + name, qs: params, json: true }, (error, r, data) => {
			if (error) {
				return reject(error);
			}
			resolve(data);
		});
	});
}

const api = module.exports = {
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
