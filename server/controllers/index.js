const User = require("../models");
const bcrypt = require("bcryptjs");

const signupControl = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const isEmailExist = await User.findOne({ email });

        //! --- CHECK EXISTING USER WITH SAME EMAIL ---
        if (isEmailExist) {
            return res.status(400).json({
                success: false,
                message: "There is already a user with this email ",
            });
        }
        //! -------------------------------------------

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role: "user",
        });

        await newUser.save();

        return res.status(201).json({
            success: true,
            message: "You signed up successfully !",
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                role: newUser.role,
            },
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Unexpected error ( from signupControl )",
        });
    }
};

module.exports = { signupControl };
