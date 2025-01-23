const mongoose = require('mongoose');

const CounterSchema = new mongoose.Schema({
    name: { type: String, required: true },
    merchants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});
const Counter = mongoose.model('Counter', CounterSchema);

module.exports = Counter;