var express = require('express');
var router = express.Router();
var session = require('express-session');
var sqlite = require('../resources/sqlite3').db
var crypto = require('crypto');

/* GET home page. */
router.get('/', function(req, res, next) {
    req.session.loggedin = false;
    req.session.username = "";
    req.session.priviliges = 0;
    req.session.accepted = 0;

    res.redirect('/login');
});

module.exports = router;
