var express = require('express');
var router = express.Router();
var session = require('express-session');
var sqlite = require('../resources/sqlite3').db
var crypto = require('crypto');

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.session.loggedin) {
		res.render('home', { status: 0, message : "" })
	} else {
    res.render('login', { status: 0, message : "" });
	}
	res.end();
});

router.post('/', function(req, res, next) {
  sqlite.open_conn('./data/gamejam_countdown.db', function(db, err) {
	if(err) return;
	var username = req.body.username;
	var password = req.body.password;
	var hashed_password = crypto.createHash('md5').update(req.body.password).digest("hex");

	if (username && password) {
		sqlite.query(db, `SELECT * FROM accounts WHERE name = "${username}" AND pass_hash = "${hashed_password}"`, function(rows, error) {
			console.log(rows)
			if (rows.length === 1) {
				req.session.loggedin = true;
				req.session.username = username;
				req.session.priviliges = rows[0].priviliges;
				req.session.accepted = rows[0].accepted;
				res.redirect('/home');
			} else {
        		res.render('login', {message: "Wrong password or username.", status: '-1' });
			}			
			res.end();
			sqlite.close_conn(db)
		});
	} else {
		res.render('login', {message: "Please type an username or password.", status: '-1' });
	}
  })
});



module.exports = router;
