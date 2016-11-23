'use strict';

const _package = require('../../package.json');
const utils = require('../utils');
const config = require('../config');
const viewdata = require('../viewdata');

const util = {
	moment: utils.moment,
	format: require('util').format,
	localDate: function(t) {
		t = t || Date.now();
		return utils.moment.tz(t, config.timezone);
	},
	questionImageSrc: utils.questionImageSrc,
	entipicUrl: utils.entipicUrl,
	listAsColums: utils.listAsColums
};

module.exports = function(req, res, next) {
	res.locals.config = config;

	const culture = res.locals.currentCulture = {
		lang: res.locale,
		country: config.country
	};
	res.locals.questionsLocale = [culture.lang, culture.country].join('-');

	culture.languageName = res.__('language_' + culture.lang);
	culture.countryName = res.__('country_' + culture.country);

	res.locals.currentDate = util.localDate();

	res.locals.site = {
		version: _package.version,
		name: config.name,
		feeds: [],
		simpleLocale: culture.lang + '_' + culture.country.toUpperCase()
	};

	res.locals.util = util;

	// new viewdata
	res.viewdata = viewdata();

	res.locals.authenticated = req.user && req.user.id;
	res.locals.userIsAdmin = res.locals.authenticated && res.user.roles.indexOf('admin') > -1;
	res.locals.userIsModerator = res.locals.authenticated && res.user.roles.indexOf('moderator') > -1;

	next();
};
