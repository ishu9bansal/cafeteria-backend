// Basic Setup for Backend with Express and Mongoose
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI

// Middleware
app.use(express.json());

// MongoDB Connection
mongoose.connect(MONGODB_URI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Mongoose Schemas and Models
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ['Customer', 'Merchant', 'Admin'], required: true },
});
const User = mongoose.model('User', UserSchema);

const CounterSchema = new mongoose.Schema({
    name: { type: String, required: true },
    merchants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});
const Counter = mongoose.model('Counter', CounterSchema);

const DishSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    inStock: { type: Boolean, default: true },
    counter: { type: mongoose.Schema.Types.ObjectId, ref: 'Counter', required: true },
});
const Dish = mongoose.model('Dish', DishSchema);

const CartSchema = new mongoose.Schema({
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    dishes: [
        {
            dish: { type: mongoose.Schema.Types.ObjectId, ref: 'Dish', required: true },
            quantity: { type: Number, required: true },
        },
    ],
});
const Cart = mongoose.model('Cart', CartSchema);

// CRUD APIs

// Users
app.get('/users', async (req, res) => {
    const users = await User.find();
    res.json(users);
});

app.post('/users', async (req, res) => {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
});

app.put('/users/:id', async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(user);
});

app.delete('/users/:id', async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.status(204).send();
});

// Counters
app.get('/counters', async (req, res) => {
    const counters = await Counter.find().populate('merchants');
    res.json(counters);
});

app.post('/counters', async (req, res) => {
    const counter = new Counter(req.body);
    await counter.save();
    res.status(201).json(counter);
});

app.put('/counters/:id', async (req, res) => {
    const counter = await Counter.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(counter);
});

app.delete('/counters/:id', async (req, res) => {
    await Counter.findByIdAndDelete(req.params.id);
    res.status(204).send();
});

// Dishes
app.get('/dishes', async (req, res) => {
    const dishes = await Dish.find().populate('counter');
    res.json(dishes);
});

app.post('/dishes', async (req, res) => {
    const dish = new Dish(req.body);
    await dish.save();
    res.status(201).json(dish);
});

app.put('/dishes/:id', async (req, res) => {
    const dish = await Dish.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(dish);
});

app.delete('/dishes/:id', async (req, res) => {
    await Dish.findByIdAndDelete(req.params.id);
    res.status(204).send();
});

// Cart
app.get('/carts', async (req, res) => {
    const carts = await Cart.find().populate('customer dishes.dish');
    res.json(carts);
});

app.post('/carts', async (req, res) => {
    const cart = new Cart(req.body);
    await cart.save();
    res.status(201).json(cart);
});

app.put('/carts/:id', async (req, res) => {
    const cart = await Cart.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(cart);
});

app.delete('/carts/:id', async (req, res) => {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(204).send();
});

// Start the Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
