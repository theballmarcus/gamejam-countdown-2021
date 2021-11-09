var express = require('express');
var router = express.Router();
var session = require('express-session');
var sqlite = require('../resources/sqlite3').db
var crypto = require('crypto');

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.loggedin) {
    res.redirect('home')
  } else {
    res.render('register', { message : "" });
  }
});

debug_len = false;
router.post('/', function(req, res, next) {
  if(req.body.username && req.body.password && req.body.confirm_pass) {
    if(req.body.password == req.body.confirm_pass) {
      if(req.body.password.length >= 8 && req.body.username.length > 3) {
        db = sqlite.open_conn('./data/gamejam_countdown.db', function(db, err) {
          if(err) {
            res.render('register', { status: 0, message : "DB connection failed? Ask an admin please." }); 
            return;
          }
          hashed_password = crypto.createHash('md5').update(req.body.password).digest("hex");
          sqlite.write(db, `INSERT INTO accounts (name,pass_hash,priviliges,accepted) VALUES(?, ?,1,0)`, [req.body.username, hashed_password], function(err) {
            if(err) {
              res.render('register', { status: 0, message : "Failed! Username is already taken" }); 
              return;
            } else {
              sqlite.close_conn(db)
              req.session.loggedin = true;
              req.session.username = req.body.username;
              req.session.priviliges = 1;
              req.session.accepted = 0;
      
              res.redirect("/home");
            }
          })
        })

      } else {
        res.render('register', { status: 0, message : "Failed! Password or username is not long enough." });
      }
    } else {
      res.render('register', { status: 0, message : "Failed! Passwords does not match." });
    }
  } else {
    res.render('register', { status: 0, message : "Failed! Please fill out all the fields." });
  }
});

module.exports = router;
