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

module.exports = router;
