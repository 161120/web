'use strict';

exports._ = require('lodash');
exports.Promise = require('bluebird');
exports.moment = require('moment-timezone');
exports.entipicUrl = require('entipic.url');

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

exports.questionImageSrc = function(q, size) {
	size = size || 'medium';
	const transform = {
		small: '/w_240',
		medium: '/w_400',
		large: '/w_800'
	};

	return 'http://res.cloudinary.com/' + process.env.CLOUDINARY_NAME + '/image/upload' + transform[size] + '/' + q.imageId;
};

exports.listAsColums = function(list, columns) {
	columns = columns || 2;
	const lists = {};
	let d;
	for (let i = 0; i < list.length; i++) {
		d = i % columns;
		if (lists[d]) {
			lists[d].push(list[i]);
		} else {
			lists[d] = [list[i]];
		}
	}

	return lists;
};
