'use strict';

require('dotenv').load();

const logger = require('./logger');

const isProduction = process.env.NODE_ENV === 'production';

if (isProduction) {
	logger.warn('Starting app...', {
		maintenance: 'start'
	});
}

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const links = require('./links');
const routes = require('./routes');
const i18n = require('./i18n');
const utils = require('./utils');
const boot = require('./boot');
const path = require('path');

function catchError(req, res, error) {
	logger.error(error.message || 'errorHandler', {
		hostname: req.hostname,
		url: req.originalUrl,
		error: error
	});

	utils.maxage(res, 0);

	const culture = res.locals.currentCulture;

	let statusCode = error.statusCode || error.code || 500;
	statusCode = statusCode < 200 ? 500 : statusCode;

	res.status(statusCode);

	// res.render('error', { error: error, statusCode: statusCode });

	res.redirect(links.home({ ul: culture.language, utm_content: statusCode, utm_source: 'self', utm_medium: 'app', utm_campaign: 'redirect' }));
}

function createApp() {
	const app = express();

	app.disable('x-powered-by');
	app.set('view engine', 'pug');
	app.set('views', path.join(__dirname, 'views'));
	//app.set('utils', utils);
	app.disable('etag');
	//app.set(require('./etag'));

	app.use(bodyParser.json()); // to support JSON-encoded bodies
	app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
		extended: true
	}));
	app.use(cookieParser());
	app.use(methodOverride());
	// app.use(responseTime());
	if (!isProduction) {
		app.use(require('morgan')('dev'));
	}

	app.locals.NODE_ENV = process.env.NODE_ENV;
	app.locals.links = links;

	app.use(boot);

	app.use(express.static(path.join(__dirname, 'public'), {
		maxAge: isProduction ? (1000 * 60 * 15) : 0
	}));

	app.use(i18n);

	routes(app);

	app.all('*', function(req, res) {
		var error = new Error('Page not found');
		error.statusCode = 404;
		catchError(req, res, error);
	});

	if (isProduction) {
		/*eslint no-unused-vars:1*/
		app.use(function(err, req, res, next) {
			catchError(req, res, err);
		});

		app.on('uncaughtException', function(req, res, route, error) {
			catchError(req, res, error);
		});
	}

	app.listen(process.env.PORT);

	console.log('Server started on port', process.env.PORT);
}

createApp();

if (isProduction) {
	process.on('uncaughtException', function(err) {
		// console.trace(err);
		logger.error('uncaughtException: ' + err.message, err);
	});
}
