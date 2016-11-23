'use strict';

const api = require('../data').api;

exports.questions = function(locals, params) {
	return api.questions(params);
};

exports.answers = function(locals, params) {
	return api.answers(params);
};

exports.question = function(locals, params) {
	return api.question(params);
};

exports.answer = function(locals, params) {
	return api.answer(params);
};
