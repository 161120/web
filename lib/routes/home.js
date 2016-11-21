'use strict';

const express = require('express');
const util = require('util');
const utils = require('../utils');
/*eslint new-cap:1*/
const route = module.exports = express.Router();
const Data = require('../data');

//index

route.get('/', function(req, res, next) {
	Data.api.questions({ where: { locale: 'ro_md' } })
		.then((result) => {
			res.send(result);
		}, next);
});
