const conInfo = require("./config/keys").dbInfo;
const mysql = require("mysql2")

const pool = mysql.createPool({
  connectionLimit: 10,
  host: conInfo.host,
  user: conInfo.dbuser,
  password: conInfo.dbpassword,
  database: conInfo.database
});

module.exports = (sql, callback) => {

  pool.getConnection((err, connection) => {
    
    if (err) {
      callback(err, null);
      return
    }

    connection.query(sql, (error, results) => {
      connection.release();

      if (error) {
        callback(err, null);
        return
      }

      callback(null, results);
    });
  });
};