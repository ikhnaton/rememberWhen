if (process.env.VCAP_SERVICES == null)
{
	process.env.VCAP_SERVICES = JSON.stringify(require('../vcap.local'));
}

require('./server/db');
require('./server/http');
