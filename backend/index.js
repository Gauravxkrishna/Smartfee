const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config(); // Load environment variables
const dbConnect = require("./config/Database");
const multer = require("multer");
const xlsx = require("xlsx");
const path = require("path");
const fs = require("fs");
const DataModel = require("./model/InstituteSchema"); // Import your MongoDB model1
const DataModelStudent = require('./model/studentSchema')

// Validate environment variables
if (!process.env.PORT) {
    console.error("Error: PORT is not defined in the environment variables.");
    process.exit(1); // Exit if PORT is not defined
}

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000", // Use environment variable for origin
    credentials: true,
}));
app.use(express.json()); // Parse incoming JSON requests
app.use(cookieParser()); // Parse cookies

// Middleware for file upload
const upload = multer({ dest: 'uploads/' });

// Database connection
dbConnect()
    .then(() => console.log("Database connected successfully."))
    .catch((err) => {
        console.error("Database connection failed:", err);
        process.exit(1); // Exit if the database connection fails
    });

// Endpoint for uploading and importing Excel file
app.post('/upload', upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: "No file uploaded." });
    }

    const filePath = req.file.path;

    try {
        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0];

        if (!sheetName) {
            return res.status(400).json({ success: false, message: "Uploaded file is empty or invalid." });
        }

        const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

        if (data.length === 0) {
            return res.status(400).json({ success: false, message: "Uploaded file contains no data." });
        }

        // Insert data into MongoDB collection
        await DataModelStudent.insertMany(data);

        // Delete the file after processing
        fs.unlinkSync(filePath);

        res.status(200).json({ success: true, message: "File imported successfully!", data });
    } catch (err) {
        console.error(err);

        // Clean up file in case of error
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        res.status(500).json({ success: false, message: "Error importing file.", error: err.message });
    }
});

// Routes
const instituteRoute = require("./routes/instituteRoutes");
const studentRoute = require("./routes/studentRoutes");

app.use("/api/v1", instituteRoute); // Prefix for institute routes
app.use("/api/students", studentRoute); // Prefix for student routes

// Root endpoint for testing
app.get("/", (req, res) => {
    res.status(200).send(`<h1>API is running. Access data at /api/v1 or /api/students.</h1>`);
});

// Catch-all route for unmatched endpoints (404 Handler)
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
