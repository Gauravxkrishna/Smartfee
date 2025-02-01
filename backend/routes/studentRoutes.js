// routes/students.js
const express = require('express');
const router = express.Router();
const Student = require('../model/studentSchema');

const { loginHandler } = require('../controllers/Auth/StudentLogin'); 

//Route for student login 
router.post('/studentLogin', loginHandler); // Login route for user authentication

// POST: Create a new student
// POST: Create or Update Student
router.post('/addStudent', async (req, res) => {
  const { 
    name, 
    degree, 
    course, 
    academicYear, 
    rollNumber, 
    primaryContact, 
    institute,
    feeDetails 
  } = req.body;

  if (
    !name || 
    !degree || 
    !course || 
    !academicYear || 
    !rollNumber || 
    !primaryContact?.name || 
    !primaryContact?.number || 
    !primaryContact?.email || 
    !institute
  ) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    // ✅ Check if a student with this rollNumber already exists
    let student = await Student.findOne({ rollNumber });

    if (student) {
      // ✅ If student exists, update the fee details
      student.feeDetails = feeDetails;
      await student.save();
      return res.status(200).json({ data: student, message: 'Student updated with new fee details' });
    }

    // ✅ If no student exists, create a new one
    const newStudent = new Student({
      name,
      degree,
      course,
      academicYear,
      rollNumber,
      primaryContact,
      institute,
      feeDetails,
      role: 'student',
    });

    await newStudent.save();
    res.status(201).json({ data: newStudent, message: 'Student added successfully' });
  } catch (error) {
    console.error("Error saving student:", error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});



// GET: Get all students
router.get('/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

// DELETE: Delete a student by ID
router.delete('/deleteStudent/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedStudent = await Student.findByIdAndDelete(id);

    if (!deletedStudent) {
      return res.status(404).json({ message: 'Student not found.' });
    }

    res.status(200).json({ message: 'Student deleted successfully.' });
  } catch (error) {
    console.error("Error deleting student:", error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

// PUT: Update a student by ID
router.put('/updateStudent/:id', async (req, res) => {
  const studentId = req.params.id;

  try {
      // Find the student by ID and update it with the data from the request body
      const updatedStudent = await Student.findByIdAndUpdate(studentId, req.body, {
          new: true, // Return the updated document
          runValidators: true, // Validate the update against the model
      });

      // If the student is not found, return a 404 error
      if (!updatedStudent) {
          return res.status(404).json({ message: 'Student not found' });
      }

      // Return the updated student data
      res.status(200).json(updatedStudent);
  } catch (error) {
      console.error('Error updating student:', error);
      res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
