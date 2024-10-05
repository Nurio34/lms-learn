const express = require("express");
const { signup, login } = require("../controllers/auth");
const checkAuth = require("../middlewares/auth");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/check-auth", checkAuth, (req, res) => {
    const user = req.user;

    return res.status(200).json({
        authenticated: true,
        user,
    });
});

module.exports = router;
