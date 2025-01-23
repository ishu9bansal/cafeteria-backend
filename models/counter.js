const mongoose = require('mongoose');

const CounterSchema = new mongoose.Schema({
    name: { type: String, required: true },
});
const Counter = mongoose.model('Counter', CounterSchema);

module.exports = Counter;