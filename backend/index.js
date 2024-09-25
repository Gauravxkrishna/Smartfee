// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Create an Express application
const app = express();
const PORT = 5000; // Set your desired port

// Middleware
app.use(cors());
app.use(express.json()); // For parsing application/json

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/smartfee');

// Define a simple schema for Institute
const instituteSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
// Define a schema for Student
const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    course: { type: String, required: true },
    academicYear: { type: String, required: true },
    instituteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Institute', required: true },
  });

// Create a model from the schema
const Institute = mongoose.model('Institute', instituteSchema);
const Student = mongoose.model('Student', studentSchema);

// Route to create a new institute
app.post('/api/institutes', async (req, res) => {
  const { name, password } = req.body;

  try {
    const newInstitute = new Institute({ name, password });
    await newInstitute.save();
    res.status(201).json({ message: 'Institute created successfully!' });
  } catch (error) {
    res.status(400).json({ message: 'Error creating institute', error: error.message });
  }
});

// Route for institute login
app.post('/api/institutes/login', async (req, res) => {
  const { name, password } = req.body;

  try {
    const institute = await Institute.findOne({ name });

    if (!institute) {
      return res.status(404).json({ message: 'Institute not found' });
    }

    if (institute.password !== password) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    res.status(200).json({ message: 'Login successful!' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

// Route to add a new student
app.post('/api/students', async (req, res) => {
    const { name, course, academicYear, instituteId } = req.body;
  
    try {
      const newStudent = new Student({ name, course, academicYear, instituteId });
      await newStudent.save();
      res.status(201).json({ message: 'Student added successfully!' });
    } catch (error) {
      res.status(400).json({ message: 'Error adding student', error: error.message });
    }
  });
  
  // Route to get all students for a specific institute
  app.get('/api/students/:instituteId', async (req, res) => {
    const { instituteId } = req.params;
  
    try {
      const students = await Student.find({ instituteId });
      res.status(200).json(students);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving students', error: error.message });
    }
  });

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
