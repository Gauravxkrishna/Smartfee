const mongoose = require('mongoose');

const feeComponentSchema = new mongoose.Schema({
  name: String,
  feeAmount: Number,
  paidAmount: Number,
  discount: Number,
  payableFee: Number,
});

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  degree: { type: String, required: true },
  course: { type: String, required: true },
  academicYear: { type: String, required: true },
  rollNumber: { type: String, required: true, unique: true },
  primaryContact: {
    name: { type: String, required: true },
    number: { type: String, required: true },
    email: { type: String, required: true },
  },
  institute: { type: String, required: true },
  role: { type: String, enum: ['student'], default: 'student', required: true },
  feeDetails: [feeComponentSchema], // Store fee components for the student
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
