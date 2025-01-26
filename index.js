// Basic Setup for Backend with Express and Mongoose
require('dotenv').config();
require('./config/connection');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const userRouter = require('./routes/users');
const dishRouter = require('./routes/dishes');
const counterRouter = require('./routes/counters');
const cartRouter = require('./routes/cart');
const authRouter = require('./routes/auth');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/dishes', dishRouter);
app.use('/counters', counterRouter);
app.use('/cart', cartRouter);

// Start the Server
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
