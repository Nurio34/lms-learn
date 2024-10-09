const Course = require("../models/course");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_Secret;

const addCourse = async (req, res) => {
    const form = req.body;
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(404).json({
            status: false,
            message: "Unauthorized demand on course creation !",
        });
    }

    const token = authHeader.split(" ")[1];
    const { id, username } = jwt.verify(token, JWT_SECRET);

    const addToForm = {
        instructerId: id,
        instructerName: username,
        students: [],
    };

    const courseForm = { ...form, ...addToForm };

    try {
        const NewCourse = new Course(courseForm);

        await NewCourse.save();
    } catch (error) {
        console.log(error);
    }
};

module.exports = { addCourse };
