'use strict';

exports = module.exports = function(app) {
	app.use(require('../middlewares/root'));

	app.use(require('./home'));
};
