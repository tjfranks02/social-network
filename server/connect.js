const conInfo = require("./config/keys").dbInfo;
const mysql = require("mysql2")

const pool = mysql.createPool({
  connectionLimit: 10,
  host: conInfo.host,
  user: conInfo.dbuser,
  password: conInfo.dbpassword,
  database: conInfo.database
});

(sql, callback) => {

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

module.exports = (sql) => {

  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      
      if (err) {
        reject({errorMSG: "Failed to acquire connection."});
      }

      connection.query(sql, (err, results) => {
        
        if (err) {
          reject({errorMSG: "Failed to query DB."});
        }

        resolve(results);
      });
    });
  });
}