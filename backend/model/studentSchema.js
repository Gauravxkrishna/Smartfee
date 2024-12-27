// models/Student.js
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  degree: { 
    type: String, 
    required: true 
  },
  course: { 
    type: String, 
    required: true 
  },
  academicYear: { 
    type: String, 
    required: true 
  },
  rollNumber: { 
    type: String, 
    required: true, 
    unique: true // Ensures roll numbers are unique
  },
  parentName: {
    type: String, 
    required: true 
  },
  parentEmail: {
    type: String, 
    required: true 
  },
  parentContactNumber: { // Corrected typo in "parentContactNumbet"
    type: Number, 
    required: true 
  },
  institute: { 
    type: String, 
    required: true 
  },
  role: {
    type: String,
    enum: ['student'], // Restrict role to 'student'
    default: 'student', // Default role is 'student'
    required: true
  }
}, { timestamps: true }); // Adds createdAt and updatedAt fields automatically

module.exports = mongoose.model('Student', studentSchema);
