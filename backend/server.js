const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// Import Routes
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Main Route Connections
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

// Basic Testing Route
app.get('/', (req, res) => {
    res.send('StackedScribe Backend API is running successfully!');
});

// Database Connection (Handles asynchronously without blocking exports)
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB connected successfully.');
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });

// ONLY spin up a local server port if we are NOT running inside Vercel's production platform
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server is happily running locally on port: ${PORT}`);
    });
}

// CRITICAL FOR VERCEL: Export the app instance at the absolute top level
module.exports = app;