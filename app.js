const express = require("express");
const morgan = require("morgan");
const usersRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const authRoute = require("./routes/auth");
const dbConfig = require("./config/dbConfig.js");
const AppError = require("./utility/AppError");
const GlobalErrorHandler = require("./controller/errorController");
// express app initialized
const app = express();
// make a session
const sessions = require("express-session");
const mysqlSessions = require("express-mysql-session")(sessions);

// Body Parser START
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
// Body Parser END

// Development logging with morgan
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else if (process.env.NODE_ENV === "production") {
  app.use(morgan("prod"));
}
// session table creation for MySQL
const mysqlSessionStore = new mysqlSessions({}, dbConfig);
app.use(
  sessions({
    key: "mysql_api_id",
    secret: "sf6s56sf65sd5f6sf1sd6f1sd",
    store: mysqlSessionStore,
    resave: false,
    saveUninitialized: false,
  })
);
// Routes
app.use("/api/v1/users", usersRoute);
app.use("/api/v1/posts", postRoute);
app.use("/api/v1/auth", authRoute);

// route middleware
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 401));
});

// Global Error Handler for DB
app.use(GlobalErrorHandler);

module.exports = app;
