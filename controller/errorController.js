const AppError = require("./../utility/AppError");

const sendDevError = (err, req, res) => {
  //  our API routes must start with /api
  if (req.originalUrl.startsWith("/api")) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stacks: err.stack,
    });
  }

  console.log("ERROR", err);
  return res.status(err.statusCode).render("error", {
    title: "Something went wrong",
    msg: err.message,
  });
};

const sendProdError = (err, req, res) => {
  //  our API routes must start with /api
  if (req.originalUrl.startsWith("/api")) {
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }
    console.log("ERROR", err);
    return res.status(500).render("error", {
      status: "error",
      message:
        "Oops, something went wrong on our end! It will be back up momentarily!",
    });
  }

  if (err.isOperational) {
    return res.status(err.statusCode).render("error", {
      title: "Something went wrong!",
      msg: err.message,
    });
  }
  console.log("ERROR!", err);
  return res.status(500).render("error", {
    tile: "Something went wrong!",
    message: "Please try again later.",
  });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (process.env.NODE_ENV == "development") {
    sendDevError(err, req, res);
  } else if (process.env.NODE_ENV == "production") {
    let error = {
      ...err,
    };
    error.message = err.message;

    sendProdError(error, req, res);
  }
};
