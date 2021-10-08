var express = require('express');
var router = express.Router();
var session = require('express-session');


/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.loggedin) {
    if(req.session.priviliges == 4) {
      if(req.query.admin == "0") {
        res.render('home', { username : req.session.username, priviliges : req.session.priviliges, accepted : req.session.accepted});
      } else {
        res.render('admin', { username : req.session.username, priviliges : req.session.priviliges, accepted : req.session.accepted});
      }
    } else {
      res.render('home', { username : req.session.username, priviliges : req.session.priviliges, accepted : req.session.accepted});
    }
  } else {
    res.redirect('/login')
  }
});

module.exports = router;
