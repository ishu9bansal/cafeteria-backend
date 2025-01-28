const express = require('express');
const User = require('../models/user');
const Counter = require('../models/counter');
const { checkRole } = require('../middleware/permissions');
const { ROLE } = require('../constants');

const router = express.Router();

router.use(checkRole(ROLE.Admin));

// Users
router.get('/', async (req, res) => {
    const users = await User.find().select('-cart -password');
    res.json(users);
});

router.get('/:id', async (req, res) => {    // TODO: add counters
    const user = await User.findById(req.params.id).select('-cart -password');
    const counters = await Counter.find({ merchants: req.params.id });
    res.json({ user, counters });
});

router.put('/:id', async (req, res) => {
    const { role } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true });
    res.json(user);
});

router.delete('/:id', async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.status(204).send();
});

module.exports = router;
