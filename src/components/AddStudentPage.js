import React, { useState } from 'react';
import axios from 'axios';

const AddStudentPage = () => {
  const [studentName, setStudentName] = useState('');
  const [course, setCourse] = useState('');
  const [academicYear, setAcademicYear] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/students', {
        name: studentName,
        course,
        academicYear,
      });
      alert('Student added successfully!');
      setStudentName('');
      setCourse('');
      setAcademicYear('');
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Add Student</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Student Name"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            className="border p-2 mb-2"
            required
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Course"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            className="border p-2 mb-2"
            required
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Academic Year"
            value={academicYear}
            onChange={(e) => setAcademicYear(e.target.value)}
            className="border p-2 mb-2"
            required
          />
        </div>
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddStudentPage;

