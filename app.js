require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();
app.use(express.json());
app.use(cors());

const dburl = process.env.dburl;
const PORT = process.env.PORT || 5000;
app.use(express.json()); // To parse JSON data in requests

// Routes
const storyRoutes = require('./routes/stories');
const userRoutes = require('./routes/users');

// Use routes
app.use('/api/stories', storyRoutes);
app.use('/api/users', userRoutes);
// Connect to MongoDB
mongoose.connect(dburl)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1); // Exit the process if MongoDB connection fails
    });

