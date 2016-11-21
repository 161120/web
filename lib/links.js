'use strict';

const urlset = require('urlset');
const path = require('path');

module.exports = urlset(path.join(__dirname, 'sitemap.json'));
