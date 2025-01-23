const express = require('express');
const User = require('../models/user');

const router = express.Router();

// Users
router.get('/', async (req, res) => {
    const users = await User.find().select('-cart');
    res.json(users);
});

router.post('/', async (req, res) => {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
});

router.put('/:id', async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(user);
});

router.delete('/:id', async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.status(204).send();
});

module.exports = router;
