const express = require('express');
const Dish = require('../models/dish');

const router = express.Router();

// Dishes
router.get('/', async (req, res) => {
    const { counter } = req.query;
    const filter = counter ? { counter } : undefined;
    const dishes = await Dish.find(filter).populate('counter');
    res.json(dishes);
});

router.post('/', async (req, res) => {
    const dish = new Dish(req.body);
    try {
        await dish.save();
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
    res.status(201).json(dish);
});

router.put('/:id', async (req, res) => {
    const dish = await Dish.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(dish);
});

router.delete('/:id', async (req, res) => {
    await Dish.findByIdAndDelete(req.params.id);
    res.status(204).send();
});

module.exports = router;