const cloudant = require('cloudant');
const DbError = require('../errors/DbError');
const config = JSON.parse(process.env.VCAP_SERVICES);

// establish Cloudant connection
var db = cloudant(
	{
		account: config.cloudantNoSQLDB[0].credentials.username,
		password: config.cloudantNoSQLDB[0].credentials.password,
		url: config.cloudantNoSQLDB[0].credentials.url
	}, (err, db, reply) => {
		if (err) {
			throw new DbError(err, reply);
		}
		console.log(`connected with username: ${reply.userCtx.name}`);
	}
);

