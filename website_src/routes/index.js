var express = require('express');
var router = express.Router();
var config = require('../config.json')
var sqlite3 = require('../resources/sqlite3').db
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'GAMEJAM2021COUNTER', count_date: config.count_date});
});

router.post('/', function(req, res, next) {
  if(req.body.action) {
    action = req.body.action;
    if(action = "getRandomQuote") {
      res.send(quote)
    }
  }
});

quote = {}
selectRandomQuote()
setInterval(selectRandomQuote, 9000); 
function selectRandomQuote() {
  sqlite3.open_conn('./data/gamejam_countdown.db', function(db, err) {
    sqlite3.query(db, 'SELECT * FROM groups_data WHERE accepted = 1;', [], function(data_rows, err1) {
      sqlite3.query(db, 'SELECT * FROM accounts;', [], function(accounts_rows, err) {
        n = randomIntFromInterval(0, data_rows.length - 1)

        var item = accounts_rows.find(item => item.id == data_rows[n].id);
        quote = {"title" : data_rows[n]["title"], "motto" : data_rows[n]["text"], "name" : item.name}
        sqlite3.close_conn(db)
      })
    })
  })
}
function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}
module.exports = router;
