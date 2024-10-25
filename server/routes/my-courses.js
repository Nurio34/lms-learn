const express = require("express");
const router = express.Router();
const {
    fetchMyCourses,
    fetchMyCourse,
    updateProgress,
} = require("../controllers/my-courses");

router.get("/fetch-courses", fetchMyCourses);
router.get("/fetch-course/:courseId", fetchMyCourse);
router.post("/update-progress/:courseId", updateProgress);

module.exports = router;
