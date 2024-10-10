const express = require("express");
const {
    addCourse,
    getCourses,
    getCourse,
    updateCourse,
} = require("../controllers/course");
const router = express.Router();

router.post("/add", addCourse);
router.get("/get-courses/", getCourses);
router.get("/get-course/:id", getCourse);
router.post("/update", updateCourse);

module.exports = router;
