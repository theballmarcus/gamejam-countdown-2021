var express = require('express');
var router = express.Router();
var session = require('express-session');
var sqlite = require('../resources/sqlite3').db
var crypto = require('crypto');

router.post('/', function(req, res, next) {
    console.log(req.body)
    if(req.session.priviliges >= 4) {
        sqlite.open_conn('./data/gamejam_countdown.db', function(db) {
            if(req.body.type == "query") {
                sqlite.query(db, req.body.command, function(rows, err) {
                    if(err) {res.send("An error occured"); console.log(err); return}
                    res.send(rows)
                    sqlite.close_conn(db)
                })
            } else if(req.body.type == "update") {
                for(i of req.body.tables) {
                    sqlite.write(db, req.body.command.replace("?", i), function(err) {
                        if(err) {res.send("An error occured"); console.log(err); return}
                        res.send("Sucess")
                    })
                    sqlite.close_conn(db)
                }
            }
        })
    } else {
        res.send({status : "-1"})
    }
});

module.exports = router;
