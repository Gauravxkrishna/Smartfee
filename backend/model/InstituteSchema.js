const mongoose = require('mongoose');

const InstituteSchema = new mongoose.Schema({
  instituteName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure the email is unique
    lowercase: true, // Normalize email to lowercase
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ['institute'], // You can extend this as needed
  }
}, { timestamps: true });

module.exports = mongoose.model('Institute', InstituteSchema);
