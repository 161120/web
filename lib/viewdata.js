'use strict';

const path = require('path');

module.exports = require('viewdata')(path.join(__dirname, './repository/*.js'));
