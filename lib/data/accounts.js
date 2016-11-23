'use strict';

const storage = require('mongo-accounts').storage();
const Accounts = require('accounts')(storage);
const cachify = require('transparentcache');

Accounts.admin.sync();

const App = Accounts.app(process.env.ACCOUNTS_APP_ID);

cachify(App.users, {
	cachingStrategy: new cachify.strategies.Timeout({ ttl: 1000 * 60 * 20 }),
	methods: { getById: [0] }
});

module.exports = App;
