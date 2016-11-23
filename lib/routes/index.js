'use strict';

exports = module.exports = function(app) {
	app.use(require('../middlewares/root'));

	app.use(require('./api'));

	app.use(require('../middlewares/layout'));

	app.use(require('./auth'));
	app.use(require('./home'));
};
