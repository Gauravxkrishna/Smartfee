import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AllStudentPage = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);

  // Fetch students data from the backend
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/students');
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">All Students</h2>
      
      {/* Add Student button */}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={() => navigate('/institute/add-student')}
      >
        Add Student
      </button>

      {/* Students Table */}
      <table className="table-auto w-full border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Course</th>
            <th className="border px-4 py-2">Academic Year</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td className="border px-4 py-2">{student.name}</td>
              <td className="border px-4 py-2">{student.course}</td>
              <td className="border px-4 py-2">{student.academicYear}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllStudentPage;
