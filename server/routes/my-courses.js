const express = require("express");
const router = express.Router();
const { fetchMyCourses } = require("../controllers/my-courses");

router.get("/fetch-courses", fetchMyCourses);

module.exports = router;
