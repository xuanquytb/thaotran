var mysql = require("mysql2");

var dbConn = mysql.createConnection({
  host: process.env.host,
  user: process.env.usernameDB,
  password: process.env.passwordDB,
  database: process.env.database,
});

dbConn.connect(function (err) {
  if (err) throw err;
  console.log("Đã kết nối cơ sở dữ liệu!");
});

module.exports = dbConn;
