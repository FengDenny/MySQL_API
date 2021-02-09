const express = require("express");
const router = express.Router();
const usersController = require("../controller/usersController");

router.get("/getAllUsers", usersController.getAllUsers);

module.exports = router;
