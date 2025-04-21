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
     required: true 
    },
  primaryContact: {
    name: { 
      type: String, 
      required: true 
    },
    number: { 
      type: String,
       required: true
     },
    email: {
       type: String, 
      required: true
     },
  },
  institute: { 
    type: String, 
    required: true 
  },
  role: {
    type: String,
    enum: ['student'], // Limit the role to only 'student'
    default: 'student', // Set default role as 'student'
    required: true,
  }
});

module.exports = mongoose.model('Student', studentSchema);
