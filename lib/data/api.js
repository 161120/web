'use strict';

const logger = require('../logger');
const utils = require('../utils');
const Promise = utils.Promise;
const storage = require('storage');
const connection = require('./connection');
const db = storage.db(connection);

module.exports = {
	Question: storage.Question,
	question: new storage.Question(db),
	answer: new storage.Answer(db),
	vote: new storage.Vote(db)
};
