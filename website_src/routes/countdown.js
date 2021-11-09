var express = require('express');
var router = express.Router();
var session = require('express-session');
var config = require('../config.json')

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('obscounter', { title: 'GAMEJAM2021COUNTER', count_date: config.count_date});
});



module.exports = router;
