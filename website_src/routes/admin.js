var express = require('express');
var router = express.Router();
var config = require("../config.json")
var sqlite3_lib = require('../resources/sqlite3.js')


allowed_sessions = {}
/* GET users listing. */
router.get('/', function(req, res, next) {
  sessionID = createRandomSessionID()
  curSession = {
    "id" : sessionID,
    "time" : Date.now()
  }
  allowed_sessions[sessionID] = curSession
  res.render('login', { session : JSON.stringify(curSession)});
});
router.post('/', function (req, res) {
  console.log(JSON.parse(req.body.session))
  if(req.sessionID in allowed_sessions) {
    res.render('admin', { title: 'Express', session : JSON.stringify(curSession)});
  } else {
    res.render('login', { session : JSON.stringify(curSession)});
  }
})

function createRandomSessionID() {
  return "asfokgoefkokoadasfmkg"
}
module.exports = router;
