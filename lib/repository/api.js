'use strict';

const api = require('../data').api;

exports.questions = function(locals, params) {
	return api.question.list(params);
};

exports.answers = function(locals, params) {
	return api.answer.list(params);
};

exports.question = function(locals, params) {
	return api.question.one(params);
};

exports.answer = function(locals, params) {
	return api.answer.one(params);
};
