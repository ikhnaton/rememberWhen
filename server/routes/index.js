/*jshint esversion: 6 */
const express = require('express');
const router = require('express').Router();
const path = require('path');

router.use("/", express.static(path.join(path.resolve(), 'dist')));

const frontEndRoutes = [
	"/create",
	"/gallery",
	"/pricing",
	"/login"
];

frontEndRoutes.map(route => router.use(route, express.static(path.resolve('.', 'dist/index.html'))));

/* router.post('/test_1', (req, res) => {
	// console.log(req.headers);
	// console.log(req.body);
	res.send('YO!');
	res.end();
}); */

module.exports = router;
