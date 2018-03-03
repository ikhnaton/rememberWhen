const cloudant = require('cloudant');
const DbError = require('../errors/DbError');
const config = JSON.parse(process.env.VCAP_SERVICES);
const position = 0;

// establish Cloudant connection
const db = cloudant({
	account: config.cloudantNoSQLDB[position].credentials.username,
	password: config.cloudantNoSQLDB[position].credentials.password,
	url: config.cloudantNoSQLDB[position].credentials.url
}, (err, dbref, reply) =>
{
	if (err)
	{
		throw new DbError(err, reply);
	}
	console.log(`connected with username: ${reply.userCtx.name}`);
});
