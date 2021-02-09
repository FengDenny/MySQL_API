const db = require("../config/dbConfig");

//pool
exports.getAllUsers = async (req, res, next) => {
  db.query("SELECT * FROM users;", (err, results, fields) => {
    console.log(results);
    res.send(results);
  });
};
