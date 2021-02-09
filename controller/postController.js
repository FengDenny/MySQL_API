const db = require("../config/dbConfig");

// promise
// exports.getAllPosts = async (req, res, next) => {
//   db.query("SELECT * FROM posts;")
//     .then(([results, fields]) => {
//       console.log(results);
//       return db.query("SELECT * FROM posts WHERE id =1");
//     })
//     .then(([results, fields]) => {
//       console.log(results);
//       res.send(results);
//     });
// };

exports.getAllPosts = async (req, res, next) => {
  db.query("SELECT * FROM posts;").then(([results, fields]) => {
    console.log(results);
    res.send(results);
  });
};
