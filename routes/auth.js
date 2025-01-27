const express = require('express');
const User = require('../models/user');

const router = express.Router();

router.post('/login', async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    const userId = user?._id || ""
    res.json({ token: "", refreshToken: "", userId });
});

router.post('/register', async (req, res) => {
    const { name, email } = req.body;
    const user = new User({ name, email, role: 'Customer' });
    await user.save();
    res.status(201).json(user);
});

module.exports = router;
