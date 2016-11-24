'use strict';

const cloudinary = module.exports = require('cloudinary');
const env = require('./env');

cloudinary.config({
	cloud_name: env.cloudinary.name,
	api_key: env.cloudinary.key,
	api_secret: env.cloudinary.secret
});
