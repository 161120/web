'use strict';

exports._ = require('lodash');
exports.Promise = require('bluebird');
exports.moment = require('moment-timezone');


const NO_CACHE = 'private, max-age=0, no-cache';
const PUBLIC_CACHE = 'public, max-age=';
const CACHE_CONTROL = 'Cache-Control';
/**
 * Set response Cache-Control
 * @maxage integet in minutes
 */
exports.maxage = function(res, maxage) {
	// maxage = 0;
	let cache = NO_CACHE;
	if (maxage > 0) {
		cache = PUBLIC_CACHE + (maxage * 60);
		//res.set('Expires', new Date(Date.now() + (maxage * 60 * 1000)).toUTCString());
	}
	res.set(CACHE_CONTROL, cache);
};
