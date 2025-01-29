const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

let refreshTokens = new Set();

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Username not registered!" });
        }

        const passwordMatched = await bcrypt.compare(password, user.password);

        if (passwordMatched) {
            const userInfo = { userId: user._id };
            const token = generateAccessToken(userInfo);
            const refreshToken = jwt.sign(userInfo, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1h' });
            refreshTokens.add(refreshToken);
            return res.json({ token: token, refreshToken: refreshToken });
        } else {
            return res.status(401).json({ message: "Authentication failed!" });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(password, salt);
        const user = new User({ name, email, role: 'Customer', password: hash });
        await user.save();
        delete user.password;
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post("/token", async (req, res) => {
    const authHeader = req.headers['authorization'];
    const refreshToken = authHeader && authHeader.split(' ')[1];
    if (!refreshToken || !refreshTokens.has(refreshToken)) {
        return res.status(401).json({ message: "Please login to continue!" });
    }
    try {
        const userInfo = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const { userId } = userInfo;
        const token = generateAccessToken({ userId });
        return res.json({ token });
    } catch (err) {
        return res.status(403).json({ message: err.message });
    }
});

router.delete('/logout', async (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token || !refreshTokens.has(token)) {
        return res.status(200).json({ message: "Already logged out" });
    }
    refreshTokens.delete(token);
    res.status(204).json({ message: 'User logged out' });
});

function generateAccessToken(userInfo) {
    return jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10s' });
}

module.exports = router;
