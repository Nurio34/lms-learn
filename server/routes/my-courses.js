const express = require("express");
const router = express.Router();
const { fetchMyCourses, fetchMyCourse } = require("../controllers/my-courses");

router.get("/fetch-courses", fetchMyCourses);
router.get("/fetch-course/:courseId", fetchMyCourse);

module.exports = router;
