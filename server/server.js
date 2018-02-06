const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const defaultPort = 9999;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.use("/", require('./routes'));

const port = process.env.PORT || defaultPort;
http.createServer(app).listen(port, () =>
{
	console.log(`Server started on http://localhost:${port}`);
});
