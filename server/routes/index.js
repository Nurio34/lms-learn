const express = require("express");
const router = express.Router();
const { signupControl } = require("../controllers");

router.post("/signup", signupControl);

module.exports = router;
