const express = require("express");
const { addCourse, getCourses, getCourse } = require("../controllers/course");
const router = express.Router();

router.post("/add", addCourse);
router.get("/get-courses/", getCourses);
router.get("/get-course/:id", getCourse);

module.exports = router;
