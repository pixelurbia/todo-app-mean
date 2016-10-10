var express = require('express');
var router = express.Router();
var Todo = require('../models/todo');

router.get('/', function (req, res, next) {
    res.render('index');
});

module.exports = router;
