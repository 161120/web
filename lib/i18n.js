'use strict';

const i18n = require('i18n');
const path = require('path');
const config = require('./config');

i18n.configure({
	locales: config.locales,
	directory: path.join(__dirname, 'locales')
});

module.exports = i18n;
