const express = require('express');
const User = require('../models/user');

const router = express.Router();

router.post('/login', async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }
    const userId = user._id;
    res.json({ token: "", refreshToken: "", userId });
});

router.post('/register', async (req, res) => {
    const { name, email } = req.body;
    const user = new User({ name, email, role: 'Customer' });
    await user.save();
    res.status(201).json(user);
});

router.delete('/logout', async (req, res) => {
    res.status(204).json({ message: 'user logged out' });
});

module.exports = router;
