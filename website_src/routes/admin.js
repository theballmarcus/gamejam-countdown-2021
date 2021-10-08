var express = require('express');
var router = express.Router();
var session = require('express-session');
var sqlite = require('../resources/sqlite3').db
var crypto = require('crypto');
var config = require("../config.json");

accepted_tables = ["accounts", "groups_data"]
accepted_fields = ["id", "name", "pass_hash", "priviliges", "accepted", "text", "accepted"]
router.post('/', function(req, res, next) {
    if(req.session.priviliges >= 4) {
        sqlite.open_conn('./data/gamejam_countdown.db', function(db) {
            if(req.body.type == "query") {
                if(req.body.table == "accounts") {
                    sqlite.query(db, `SELECT * FROM accounts;`, [], function(rows, err) {
                        if(err) {
                            res.send(config.error_messages.sql_error_msg); 
                            console.log(err); 
                            return
                        }
    
                        res.send(rows)
                        sqlite.close_conn(db)
                    })
                } else if (req.body.table == "groups_data") {
                    sqlite.query(db, `SELECT * FROM groups_data;`, [], function(rows, err) {
                        if(err) {
                            res.send(config.error_messages.sql_error_msg); 
                            console.log(err); 
                            return
                        }
    
                        res.send(rows)
                        sqlite.close_conn(db)
                    })
                }
                
            } else if(req.body.type == "update") {
                if(accepted_tables.includes(req.body.table)) {
                    if(accepted_fields.includes(req.body.field)) {
                        sqlite.write(db, `UPDATE ${req.body.table} SET '${req.body.field}' = ? WHERE id = ?;`, req.body.fillins, function(err) {
                            if(err) {
                                console.log(err); 
                                res.send(config.error_messages.sql_error_msg); 
                                return
                            }
                            res.send(config.success_messages.sql_success_msg); 
                            sqlite.close_conn(db)   
                        })
                    } else {
                        res.send(config.error_messages.sql_error_msg); 
                    }
                
                } else {
                    res.send(config.error_messages.sql_error_msg)
                }
            } else if(req.body.type == "remove") {
                if(parseInt(req.body.id) != NaN) {
                    sqlite.write(db, `DELETE FROM accounts WHERE id = ?`, [req.body.id], function(err) {
                        if(err) {
                            console.log(err); 
                            res.send(config.error_messages.sql_error_msg); 
                            return
                        }
                        sqlite.write(db, `DELETE FROM groups_data WHERE id = ?`, [req.body.id], function(err) {
                            if(err) {
                                console.log(err); 
                                res.send(config.error_messages.sql_error_msg); 
                                return
                            }
                            res.send(config.success_messages.sql_success_msg); 
                            sqlite.close_conn(db)   
                        }) 
                    })
                } else {
                    res.send("That is not an integer.")
                }
            }
        })
    } else {
        res.send("Permission denied.")
    }
});

module.exports = router;
