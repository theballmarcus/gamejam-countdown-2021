var express = require('express');
var router = express.Router();
var session = require('express-session');
var sqlite3_lib = require('../resources/sqlite3.js').db
var config = require("../config.json")

var curUsers = {}
/* GET home page. */
router.get('/', function(req, res) {
  if(req.session.loggedin) {
    if(req.session.priviliges == 4) {
      if(req.query.admin == "0") {
        res.render('home', { username : req.session.username, accepted : req.session.accepted, count_date: config.count_date});
      } else {
        res.render('admin', { username : req.session.username, accepted : req.session.accepted});
      }
    } else {
      res.render('home', { username : req.session.username, accepted : req.session.accepted, count_date: config.count_date});
    }
  } else {
    res.redirect('/login')
  }
});

router.post('/', function(req, res, next) {
  if(req.session.loggedin) {
    if(req.body.motto && req.body.motto_title) {
      sqlite3_lib.open_conn('./data/gamejam_countdown.db', function(db) {
        sqlite3_lib.query(db, `SELECT * FROM accounts WHERE name = ?;`,[req.session.username], function(acc_rows, err) {
          if(err) {
            res.send(config.error_messages.sql_error_msg)
            sqlite3_lib.close_conn(db)
            return

          }
          sqlite3_lib.query(db, `SELECT * FROM groups_data WHERE id= ?;`,[acc_rows[0].id], function(rows, err) {
            if(err) {
              res.send(config.error_messages.sql_error_msg)
              sqlite3_lib.close_conn(db)
              return;

            }
            if(rows.length == 1) {
              if(req.body.motto_title > 15 || req.body.motto > 30) {
                res.send(config.error_messages.too_long_message)
                return
              }
              sqlite3_lib.write(db, `UPDATE groups_data SET text = ?,title = ? WHERE id = ?;`, [req.body.motto,req.body.motto_title, acc_rows[0].id],function(err) {
                if(err) {text
                  res.send(config.error_messages.sql_error_msg)
                  sqlite3_lib.close_conn(db)
                  return

                }
                res.render('home', { username : req.session.username, accepted : req.session.accepted, count_date: config.count_date});
                sqlite3_lib.close_conn(db)
                return

              })
              return

            } else {
              if(req.body.motto_title > 15 || req.body.motto > 30) {
                res.send(config.error_messages.too_long_message)
                return
              }
              sqlite3_lib.write(db, `INSERT INTO groups_data (id,title,text) VALUES(?, ?, ?);`,[acc_rows[0].id, req.body.motto_title, req.body.motto], function(err) {
                if(err) {
                  res.send(config.error_messages.sql_error_msg)
                  return;

                }
                sqlite3_lib.close_conn(db)
                res.send(config.success_messages.sql_success_msg)
                return

              });
            }
          });
        })
      })
    } else {
      res.send("Missing something?")
    }
  } else {
    res.redirect('/login')
  }
});

module.exports = router;
