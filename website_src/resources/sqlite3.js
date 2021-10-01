var sqlite3 = require('sqlite3').verbose();

module.exports.db = {
    open_conn : function(db_location) {
        var db = new sqlite3.Database('./data/notes.db')
        return db
    },
    close_conn : function(db) {
      db.close()
    }, 
    query : function (db, command) {
      db.serialize(function() {
        db.each(command, function(err, row) {
          console.log(row.id + ":" + row.name)
        })
      })
    },
    write : function (db_location, command) {
      var db = new sqlite3.Database(db_location)
      db.serialize(function() {
        db.run(command, function(err) {
          if (err) {
            return console.log(err.message);
          }
          // get the last insert id
          console.log(`A row has been inserted with rowid ${this.lastID}`);
        })
      })
      db.close()
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