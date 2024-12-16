const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config(); // Load environment variables
const dbConnect = require('./config/Database');

// Initialize Express app
const app = express();

// Validate environment variables
if (!process.env.PORT) {
    console.error("Error: PORT is not defined in the environment variables.");
    process.exit(1);
}

const PORT = process.env.PORT || 4000;

// Middleware
// app.use(cors({ origin: 'http://your-frontend-domain.com', credentials: true })); // Update origin for security
app.use(express.json());
app.use(cookieParser());

// Database connection
dbConnect()
    .then(() => console.log("Database connected successfully."))
    .catch((err) => {
        console.error("Database connection failed:", err);
        process.exit(1); // Exit if the database connection fails
    });

// Routes
const instituteRoute = require('./routes/instituteRoutes');
const studentRoute = require('./routes/studentRoutes');

app.use('/api/v1', instituteRoute); // Prefix all institute routes
app.use('/api/students', studentRoute); // Prefix all student routes

// Default route
app.get('/data', (req, res) => {
    res.status(200).send(`<h1>Got the data</h1>`);
});

// 404 Error Handler for unmatched routes
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
    });
});

// Centralized Error Handler
app.use((err, req, res, next) => {
    console.error("Error:", err.message);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
