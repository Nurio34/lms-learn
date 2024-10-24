const mongoose = require("mongoose");

const LectureProgressSchema = new mongoose.Schema({
    lectureId: String,
    viewed: Boolean,
    viewedDate: Date,
});

const CourseProgressSchema = new mongoose.Schema({
    studentId: String,
    courseId: String,
    complated: Boolean,
    complationDate: Date,
    lectureProgress: [LectureProgressSchema],
});

module.exports = mongoose.model("Progress", CourseProgressSchema);
