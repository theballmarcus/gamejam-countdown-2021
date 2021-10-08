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
    query : function (db, command, callback) {
      db.serialize(function() {
        db.all(command, function(err, rows) {
          if(err) {callback(rows,err);console.log(err); return;}
          callback(rows)
        })
      })
    },
    write : function (db, command, callback) {
      db.serialize(function() {
        db.run(command, function(err) {
          if (err) {
            callback(err)
          } else {
            callback()
          }
        })
      })
    }
}

/*

  // insert one row into the langs table
  db.run(`INSERT INTO langs(name) VALUES(?)`, ['C'], function(err) {
    if (err) {
      return console.log(err.message);
    }
    // get the last insert id
    console.log(`A row has been inserted with rowid ${this.lastID}`);
  });


var db = new sqlite3.Database(':memory:');

db.serialize(function() {
  db.run("CREATE TABLE lorem (info TEXT)");

  var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
  for (var i = 0; i < 10; i++) {
      stmt.run("Ipsum " + i);
  }
  stmt.finalize();

  db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
      console.log(row.id + ": " + row.info);
  });
});

db.close();*/