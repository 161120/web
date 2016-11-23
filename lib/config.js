'use strict';

const env = require('./env');
const _ = require('./utils')._;

let configFile = env.configFile;

if (!configFile) {
	const configName = env.configName || 'default';

	// if (!configName) {
	// 	throw new Error('CONFIG_FILE or CONFIG_NAME are required!');
	// }

	configFile = './config/' + configName;
}

const defaultConfig = require('./config/default');
const config = require(configFile);

module.exports = _.assign({}, defaultConfig, config);
