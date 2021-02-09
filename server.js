const dotenv = require("dotenv");
const app = require("./app");
// Catching exceptions
process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION");
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: "./config/config.env" });

//  port declarations
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`App is running on port ${port} in ${process.env.NODE_ENV} mode`);
});

// Catching rejections
process.on("uncaughtRejection", (err) => {
  console.log("UNCAUGHT REJECTION");
  console.log(err.name, err.message);
  process.exit(1);
});
