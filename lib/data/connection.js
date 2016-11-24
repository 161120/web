'use strict';

const storage = require('storage');
module.exports = storage.connect(process.env.CONNECTION_STRING);
