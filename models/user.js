const mongoose = require('mongoose');
const Dish = require('./dish');
const { ROLE } = require('../constants');

const CartItemSchema = new mongoose.Schema({
    dish: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dish',
        required: true,
        validate: {
            validator: async function (dishId) {
                return await Dish.exists({ _id: dishId, inStock: true });
            },
            message: 'Invalid Cart! Please empty your cart.'
        }
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, 'Quantity must be at least 1.']
    },
});

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: Object.keys(ROLE), required: true },
    cart: { type: [CartItemSchema] },
});
const User = mongoose.model('User', UserSchema);

module.exports = User;