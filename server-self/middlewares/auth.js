const jwt = require("jsonwebtoken");
JWT_SECRET = process.env.JWT_SECRET;

const checkAuth = async (req, res, next) => {
    const authHeaders = req.headers.authorization;

    if (!authHeaders) {
        return res.status(401).json({
            authenticated: false,
            message: "User is not Authenticated !",
        });
    }

    const token = authHeaders.split(" ")[1];
    const user = jwt.verify(token, JWT_SECRET);

    req.user = user;
    next();
};

module.exports = checkAuth;
