const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const StudentCourses = require("../models/studentCourses");
const studentCourses = require("../models/studentCourses");

const fetchMyCourses = async (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized action",
        });
    }

    const token = authHeader.split(" ")[1];
    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    try {
        const MyCourses = await studentCourses.findOne({ studentId: id });

        if (!MyCourses) {
            return res.status(404).json({
                success: false,
                message: "You don't have any courses bought yet !",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Here are your courses",
            data: MyCourses.courses,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unexpected Network error !",
        });
    }
};

module.exports = { fetchMyCourses };
