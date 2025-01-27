const express = require('express');
const Dish = require('../models/dish');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const dishes = await Dish.find({ counter: req.counter._id });
        return res.json(dishes);
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    const { name, price, inStock } = req.body;
    const dish = new Dish({
        name,
        price,
        inStock,
        counter: req.counter._id,
    });
    try {
        await dish.save();
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
    res.status(201).json(dish);
});

router.put('/:id', async (req, res) => {
    const { name, price, inStock } = req.body;
    try {
        const dish = await Dish.findByIdAndUpdate(req.params.id, { name, price, inStock }, { new: true });
        return res.json(dish);
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Dish.findByIdAndDelete(req.params.id);
        return res.status(204).send();
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
});

module.exports = router;