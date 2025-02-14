// Basic Setup for Backend with Express and Mongoose
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
require('./config/connection');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const morgan = require('morgan');
const userRouter = require('./routes/users');
const dishRouter = require('./routes/dishes');
const counterRouter = require('./routes/counters');
const cartRouter = require('./routes/cart');
const authRouter = require('./routes/auth');
const { auth } = require('./middleware/auth');
const { populateCounter } = require('./middleware/counter');
const { authCounter } = require('./middleware/permissions');
const Dish = require('./models/dish');
const Counter = require('./models/counter');

const app = express();

// Middleware
app.use(morgan('combined'));
app.use(express.json());
app.use(cors({
    origin: true,
}));
app.use(cookieParser());

app.use('/auth', authRouter);

// Dishes for home page, without auth
app.get('/dishes', async (req, res) => {
    const { counter: counterId } = req.query;
    const counter = counterId ? (await Counter.findById(counterId)) : undefined;
    const filter = counterId ? { counter: counterId } : undefined;
    const dishes = await Dish.find(filter);
    res.json({ dishes, counter });
});

app.use(auth);

app.use('/users', userRouter);
app.use('/counters', counterRouter);
app.use('/cart', cartRouter);
app.use('/counter/:counterId', populateCounter, authCounter, dishRouter)



// Start the Server
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
});
