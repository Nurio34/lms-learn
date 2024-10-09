const express = require("express");
const { addCourse } = require("../controllers/course");
const router = express.Router();

router.post("/add", addCourse);

module.exports = router;
