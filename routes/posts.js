const express = require("express");
const router = express.Router();
const postController = require("../controller/postController");

router.get("/getAllPosts", postController.getAllPosts);

module.exports = router;
