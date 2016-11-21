'use strict';

const _ = require('./utils')._;

let configFile = process.env.CONFIG_FILE;

if (!configFile) {
	const configName = process.env.CONFIG_NAME || 'default';

	// if (!configName) {
	// 	throw new Error('CONFIG_FILE or CONFIG_NAME are required!');
	// }

	configFile = './config/' + configName;
}

const defaultConfig = require('./config/default');
const config = require(configFile);

module.exports = _.assign({}, defaultConfig, config);
