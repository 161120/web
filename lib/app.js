'use strict';

require('dotenv').load();

const env = require('./env');
const logger = require('./logger');

if (env.isProduction) {
	logger.warn('Starting app...', {
		maintenance: 'start'
	});
}

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const config = require('./config');
const links = require('./links');
const routes = require('./routes');
const i18n = require('./i18n');
const utils = require('./utils');
const path = require('path');
const sessions = require('client-sessions');
const passport = require('./passport');

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

	res.redirect(links.home({ ul: culture.lang, utm_content: statusCode, utm_source: 'self', utm_medium: 'app', utm_campaign: 'redirect' }));
}

function createApp() {
	const app = express();

	app.disable('x-powered-by');
	app.set('view engine', 'jade');
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
	if (!env.isProduction) {
		app.use(require('morgan')('dev'));
	}

	app.locals.NODE_ENV = process.env.NODE_ENV;
	app.locals.links = links;

	app.use(express.static(path.join(__dirname, 'public'), {
		maxAge: env.isProduction ? (1000 * 60 * 15) : 0
	}));

	app.use(i18n.init);

	app.use(sessions({
		cookieName: env.session.cookieName,
		requestKey: 'session', // requestKey overrides cookieName for the key name added to the request object.
		secret: env.session.secret, // should be a large unguessable string or Buffer
		duration: 24 * 60 * 60 * 1000 // how long the session will stay valid in ms
	}));

	// passport
	app.use(passport.initialize());
	app.use(passport.session());

	routes(app);

	if (env.isProduction) {
		app.all('*', function(req, res) {
			var error = new Error('Page not found');
			error.statusCode = 404;
			catchError(req, res, error);
		});

		/*eslint no-unused-vars:1*/
		app.use(function(err, req, res, next) {
			catchError(req, res, err);
		});

		app.on('uncaughtException', function(req, res, route, error) {
			catchError(req, res, error);
		});
	}

	app.listen(env.port);

	console.log('Server started on port', env.port);
}

createApp();

if (env.isProduction) {
	process.on('uncaughtException', function(err) {
		// console.trace(err);
		logger.error('uncaughtException: ' + err.message, err);
	});
}
