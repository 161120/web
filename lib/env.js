'use strict';

exports.isProduction = process.env.NODE_ENV === 'production';
exports.port = process.env.PORT;

exports.configFile = process.env.CONFIG_FILE;
exports.configName = process.env.CONFIG_NAME;

exports.session = {
	cookieName: process.env.SESSION_COOKIE_NAME,
	secret: process.env.SESSION_SECRET
};

exports.facebook = {
	clientId: process.env.FACEBOOK_CLIENT_ID,
	clientSecret: process.env.FACEBOOK_CLIENT_SECRET
};
