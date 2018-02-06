const express = require('express');
const router = require('express').Router();
const path = require('path');

router.use("/", express.static(__dirname + '/../../dist'));
router.use("/img", express.static(__dirname + '/../../img'));
//router.use("/api", require('./api'));

router.get('/', (req, res) =>
{
	res.redirect("/index.html");
});

router.get('/app', (req, res) =>
{
	res.redirect("/app/index.html");
});

module.exports = router;
