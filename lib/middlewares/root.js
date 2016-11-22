'use strict';

var _package = require('../../package.json');
var utils = require('../utils');
var config = require('../config');

var util = {
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
	const culture = res.locals.currentCulture = {
		lang: res.locale,
		country: config.country
	};
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

	next();
};
