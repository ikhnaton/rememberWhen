/*jshint esversion: 6 */
const express = require('express');
const router = require('express').Router();
const path = require('path');

router.use("/", express.static(path.join(__dirname, '/../../dist')));

//router.use('/api', require('./users'));

module.exports = router;
