if (!process.env.VCAP_SERVICES)
{
	process.env.VCAP_SERVICES = JSON.stringify(require('../vcap.local'));
}

//require('./server/db');
require('./server/http');
