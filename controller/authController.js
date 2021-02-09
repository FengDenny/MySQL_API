const db = require("../config/dbConfig");

exports.signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  //Validate data, if bad send back response
  // res.direct('/signup)
  let baseSQL =
    "INSERT INTO users (username, email, password, created) VALUES (?, ?, ?, now())";
  await db
    .query(baseSQL, [username, email, password])
    .then(([results, fields]) => {
      if (results && results.affectedRows) {
        res.json({
          status: "success",
          message: `${email} has successfully signed up!`,
        });
      } else {
        res.send("user was not  created");
      }
    });
};
