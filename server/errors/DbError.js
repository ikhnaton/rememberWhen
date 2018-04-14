class DbError extends Error
{
	constructor(message, context, errorObj)
	{
		super(message);
		this.name = "DbError";
		this.error = errorObj;
		this.context = context;
	}
}

module.exports = DbError;
