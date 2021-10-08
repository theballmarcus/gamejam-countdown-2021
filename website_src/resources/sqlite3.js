var sqlite3 = require('sqlite3').verbose();

module.exports.db = {
    open_conn : function(db_location, callback) {
        var db = new sqlite3.Database(db_location)
        callback(db)
    },
    close_conn : function(db, callback) {
      db.close()
      if (typeof callback === 'function') callback()
    }, 
    query : function (db, command, fill_ins, callback) {
      db.serialize(function() {
        db.all(command, fill_ins, function(err, rows) {
          if(err) {
            callback(rows,err);
            console.log(err); 
            return;
          }
          callback(rows)
        })
      })
    },
    write : function (db, command, fill_ins,callback) {
      db.serialize(function() {
        db.run(command, fill_ins, function(err) {
          if (err) {
            callback(err)
          } else {
            callback()
          }
        })
      })
    }
}