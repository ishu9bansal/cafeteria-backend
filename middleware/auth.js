const User = require("../models/user");

async function auth(req, res, next) {
    const id = req.headers['x-userid'];
    try {
        req.user = await User.findById(id).populate('cart.dish');
    } catch (err) {
        console.error(err);
        return res.status(400).json({ message: "Please login to continue!" });
    }
    if (req.user) {
        next();
    } else {
        return res.status(404).json({ message: "User not found!" });
    }
}

module.exports = {
    auth,
};