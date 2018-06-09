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

router.get("/image", (req, res, next) => {

})
//router.use('/api/typeform', require('./typeform'));

const Jimp = require("jimp");

// open a file called "lenna.png"
// Jimp.read("src/images/main.png", (err, lenna) => {
Jimp.read("https://images.sftcdn.net/images/t_optimized,f_auto/p/befbcde0-9b36-11e6-95b9-00163ed833e7/260663710/the-test-fun-for-friends-screenshot.jpg", (err, lenna) => {
	if (err)
	{
		throw err;
	}

	lenna.
		resize(256, 256).
		quality(60).
		greyscale().
		write("test-bw.jpg");
});

module.exports = router;
