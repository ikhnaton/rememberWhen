if (!process.env.VCAP_SERVICES)
{
	try
	{
		process.env.VCAP_SERVICES = JSON.stringify(require('../vcap.local'));
	}
	catch (error)
	{
		console.log(error);
	}
}

//require('./server/db');
require('./server/http');
