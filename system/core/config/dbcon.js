var mysql = require('mysql');

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root@123',
    database: 'node_crud'
 });

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = con;