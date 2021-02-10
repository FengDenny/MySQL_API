const db = require("../config/dbConfig");
const bcrypt = require("bcryptjs");
const CatchAsync = require("../utility/CatchAsync");
const AppError = require("../utility/AppError");

exports.signup = CatchAsync(async (req, res, next) => {
  const { username, email, password } = req.body;
  //Validate data, if bad send back response
  // res.direct('/signup)
  db.execute("SELECT * FROM users WHERE username=?", [username])
    .then(([results, fields]) => {
      if (results && results.length == 0) {
        return db.execute("SELECT * FROM users WHERE email=?", [email]);
      } else {
        return next(
          new AppError(
            `${username} is associated with an existing account. Please login.`,
            401
          )
        );
      }
    })
    .then(([results, fields]) => {
      if (results && results.length == 0) {
        return bcrypt.hash(password, 15);
      } else {
        res.status(200).json({
          status: "fail",
          error: "Email already exist. Please login.",
        });
      }
    })
    .then((hashedPassword) => {
      let baseSQL =
        "INSERT INTO users (username, email, password, created) VALUES (?, ?, ?, now());";
      return db.execute(baseSQL, [username, email, hashedPassword]);
    })
    .then(([results, fields]) => {
      if (results && results.affectedRows) {
        res.status(200).json({
          status: "success",
          message: `${email} has successfully signed up!`,
        });
      } else {
        res.status(500).json({
          status: "fail",
          error: `"Server error, user could not be created"`,
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

exports.login = async (req, res, next) => {
  const { username, password } = req.body;

  //Validate data, if bad send back response
  // res.direct('/login)
  let baseSQL = "SELECT id, username, password FROM users WHERE username=? ;";
  let userID;
  db.execute(baseSQL, [username])
    .then(([results, fields]) => {
      if (results && results.length == 1) {
        let hashedPassword = results[0].password;
        userID = results[0].id;
        return bcrypt.compare(password, hashedPassword);
      } else {
        res.status(401).json({
          status: "fail",
          error: "Username or password is incorrect. Please try again. ",
        });
      }
    })
    .then((passwordMatch) => {
      if (passwordMatch) {
        req.session.username = username;
        req.session.userID = userID;
        res.status(401).json({
          status: "success",
          message: `Welcome back, ${username}`,
        });
      } else {
        return res.status(401).json({
          status: "fail",
          error: "Invalid username or password. Please try again. ",
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
