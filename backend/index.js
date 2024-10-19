const express = require('express');
const app = express();

// Load config from env file
require('dotenv').config();
const PORT = process.env.PORT || 4000;

// Middleware to parse JSON request body
app.use(express.json());

// Connect to the database
const dbConnect = require('./config/Database');
dbConnect();

// Mount the institute API route
const instituteRoute = require('./routes/instituteRoutes');
app.use('/api/v1', instituteRoute);

// Default route
app.get('/', (req, res) => {
    res.send(`<h1>Got the data</h1>`);
});

// Error handling for unmatched routes
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}.`);
});
