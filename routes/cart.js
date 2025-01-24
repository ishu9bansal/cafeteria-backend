const express = require('express');
const User = require('../models/user');

const router = express.Router();

router.use(auth);

// Cart
router.get('/', async (req, res) => {   // also fetch user details
    const user = req.user;
    res.json(user);
});

router.post('/:dishId', async (req, res) => {
    const item = req.user.cart.find(item => item.dish.id === req.params.dishId);
    if (item) {
        return res.status(400).json({ message: "item already added" });
    }
    req.user.cart.push({ dish: req.params.dishId, quantity: 1 });
    await req.user.save().then(u => u.populate('cart.dish'));
    res.status(201).json(req.user.cart);
});

router.patch('/:dishId', async (req, res) => {
    const item = req.user.cart.find(item => item.dish.id === req.params.dishId);
    item.quantity += req.body.changeQuantity;
    const cart = req.user.cart;
    try {
        await req.user.save();
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }

    return res.json(cart);
});

router.delete('/:dishId', async (req, res) => {
    req.user.cart = req.user.cart.filter(item => item.dish.id !== req.params.dishId);
    await req.user.save();
    res.status(200).json(req.user.cart);
});

router.delete('/', async (req, res) => {
    req.user.cart = [];
    await req.user.save();
    res.status(200).json(req.user.cart);
});

async function auth(req, res, next) {
    const id = '6792087229a93e1316c7f1da';  // TODO: extract from token
    req.user = await User.findById(id).populate('cart.dish');
    next();
}

module.exports = router;
