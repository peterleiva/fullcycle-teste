var express = require("express");
const { upload } = require("./controller");

var router = express.Router();

router.post("/upload", upload);

module.exports = router;
