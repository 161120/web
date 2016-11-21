'use strict';

const winston = require('winston');

module.exports = winston;

winston.loggly = function loggly(options) {
	options = options || {};
	require('winston-loggly');
	var logger = options.logger || winston;

	logger.add(winston.transports.Loggly, {
		level: options.level || process.env.LOGGLY_LEVEL || 'warn',
		subdomain: process.env.LOGGLY_DOMAIN,
		inputToken: process.env.LOGGLY_TOKEN,
		tags: options.tags,
		json: options.json
	});
};

winston.removeConsole = function removeConsole(logger) {
	logger = logger || winston;
	return logger.remove(logger.transports.Console);
};

if (process.env.NODE_ENV === 'production') {
	winston.loggly({
		tags: ['noname', 'web'],
		json: true
	});
	winston.removeConsole();
}
