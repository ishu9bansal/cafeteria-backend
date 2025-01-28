const User = require("../models/user");
const jwt = require('jsonwebtoken');

async function auth(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: "Please login to continue!" });
    }
    try {
        const userInfo = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const { userId } = userInfo;
        req.user = await User.findById(userId).populate('cart.dish');
    } catch (err) {
        return res.status(403).json({ message: err.message });
    }
    if (!req.user) {
        return res.status(404).json({ message: "User not found!" });
    }
    next();
}

module.exports = {
    auth,
};