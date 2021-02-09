const express = require("express");
const morgan = require("morgan");
const usersRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const authRoute = require("./routes/auth");
// express app initialized
const app = express();

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

// Routes
app.use("/api/v1/users", usersRoute);
app.use("/api/v1/posts", postRoute);
app.use("/api/v1/auth", authRoute);

module.exports = app;
