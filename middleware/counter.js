const Counter = require("../models/counter");

async function populateCounter(req, res, next) {
    const { counterId } = req.params;
    try {
        const counter = await Counter.findById(counterId);
        req.counter = counter;
    } catch (err) {
        return res.status(404).json({ message: "Counter not found!" });
    }
    next();
}

module.exports = {
    populateCounter
};