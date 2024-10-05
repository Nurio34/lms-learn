const User = require("../models/user");
const bcjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const signup = async (req, res) => {
    const { username, email, role, password } = req.body;

    const existingUserWithSameEmail = await User.findOne({ email });

    if (existingUserWithSameEmail) {
        return res.status(404).json({
            success: false,
            message: "There is already an account with this email !",
        });
    }

    const hashedPassword = await bcjs.hash(password, 10);

    const newUser = new User({
        username,
        email,
        role,
        password: hashedPassword,
    });
    await newUser.save();

    const token = jwt.sign(
        {
            username,
            email,
            role,
        },
        JWT_SECRET,
        { expiresIn: "5m" },
    );

    return res.status(201).json({
        success: true,
        message: "Registered successfully",
        token,
    });
};

const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "Wrong email. Try again !",
        });
    }

    const comparedPasswords = await bcjs.compare(password, user.password);

    if (!comparedPasswords) {
        return res.status(404).json({
            success: false,
            message: "Wrong password. Try again !",
        });
    }

    const token = jwt.sign(
        {
            username: user.username,
            email: user.email,
            role: user.role,
        },
        JWT_SECRET,
        { expiresIn: "5m" },
    );

    return res.status(200).json({
        success: true,
        message: "Logged in successfully.",
        token,
    });
};

module.exports = { signup, login };
