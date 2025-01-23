const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI

// MongoDB Connection
mongoose.connect(MONGODB_URI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch((err) => console.error('MongoDB connection error:', err));
