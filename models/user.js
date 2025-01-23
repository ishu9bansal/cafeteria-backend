const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema({
    dish: { type: mongoose.Schema.Types.ObjectId, ref: 'Dish', required: true },
    quantity: { type: Number, required: true },
});

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ['Customer', 'Merchant', 'Admin'], required: true },
    cart: { type: [CartItemSchema] },
    counter: { type: mongoose.Schema.Types.ObjectId, ref: 'Counter' }
});
const User = mongoose.model('User', UserSchema);



module.exports = User;