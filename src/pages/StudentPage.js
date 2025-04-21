import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from "../components/student/button";
import { Input } from "../components/student/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/student/dialog"
import { ArrowLeft, Plus, X, Check } from "lucide-react";
import * as XLSX from 'xlsx';
import { Eye, Trash2, Edit } from "lucide-react";
import EditFeePage from './EditFeePage';
import { useStudentContext } from './StudentContext';  // Import the context




export default function StudentManagement() {
  const [view, setView] = useState('students');

  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const { selectedInstitute, setSelectedInstitute, addedStudentName, setAddedStudentName, setAddedStudentDegree, AddedStudentDegree, setAddedStudentCourse, AddedStudentCourse, setAddedStudentRoll, AddedStudentRoll, setAddedStudentNumber, AddedStudentNumber, setAddedStudentEmail, AddedStudentEmail } = useStudentContext();
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null); // For viewing student details
  const [isEditMode, setIsEditMode] = useState(false); // To determine edit mode
  const [editStudentData, setEditStudentData] = useState({}); // To hold the data for the student being edited


  // Fetch students from the server
  useEffect(() => {
    if (view === 'students') {
      fetchStudents();
    }
  }, [view]);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('https://smartfee-kappa.vercel.app/api/students/students');
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  // Filter students based on the search term
  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.institute.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const deleteStudent = async (studentId) => {
    try {
      await axios.delete(`https://smartfee-kappa.vercel.app/api/students/deleteStudent/${studentId}`);
      setStudents((prevStudents) => prevStudents.filter((student) => student._id !== studentId));
      alert("Student deleted successfully.");
    } catch (error) {
      console.error("Error deleting student:", error);
      alert("Failed to delete the student. Please try again.");
    }
  };

  const confirmDeleteStudent = (studentId) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this student?");
    if (isConfirmed) {
      deleteStudent(studentId);
    }
  };

  // Function to download students as an Excel file
  const downloadExcel = () => {
    const formattedStudents = filteredStudents.map((student) => ({
      Name: student.name,
      Degree: student.degree,
      Course: student.course,
      AcademicYear: student.academicYear,
      RollNumber: student.rollNumber,
      Institute: student.institute,
      PrimaryContactName: student.primaryContact.name,
      PrimaryContactNumber: student.primaryContact.number,
      PrimaryContactEmail: student.primaryContact.email,
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedStudents);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");

    const fileName = `students_${new Date().toISOString().slice(0, 10)}
  }.xlsx`;
    XLSX.writeFile(workbook, fileName);
  };

  // StudentDetail component
  const StudentDetail = ({ student }) => (
    <Dialog open={!!student} onOpenChange={() => setSelectedStudent(null)}>
      <DialogContent className="sm:max-w-[500px]  shadow-lg rounded-lg p-6">
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center text-xl font-semibold text-gray-800">
            <div className='flex justify-between'>

              <div>
                <span className="flex-1">Student Details</span>
              </div>
              <div>

                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:text-black bg-red-600 transition-colors"
                  onClick={() => setSelectedStudent(null)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="py-4 space-y-3">
          <p className="text-gray-700">
            <strong className="font-medium text-gray-900">Name:</strong> {student.name}
          </p>
          <p className="text-gray-700">
            <strong className="font-medium text-gray-900">Degree:</strong> {student.degree}
          </p>
          <p className="text-gray-700">
            <strong className="font-medium text-gray-900">Course:</strong> {student.course}
          </p>
          <p className="text-gray-700">
            <strong className="font-medium text-gray-900">Academic Year:</strong> {student.academicYear}
          </p>
          <p className="text-gray-700">
            <strong className="font-medium text-gray-900">Roll Number:</strong> {student.rollNumber}
          </p>
          <p className="text-gray-700">
            <strong className="font-medium text-gray-900">Institute:</strong> {student.institute}
          </p>
          <p className="text-gray-700">
            <strong className="font-medium text-gray-900">Primary Contact Name:</strong> {student.primaryContact.name}
          </p>
          <p className="text-gray-700">
            <strong className="font-medium text-gray-900">Primary Contact Number:</strong> {student.primaryContact.number}
          </p>
          <p className="text-gray-700">
            <strong className="font-medium text-gray-900">Primary Contact Email:</strong> {student.primaryContact.email}
          </p>
        </div>
      </DialogContent>
    </Dialog>

  );



  // StudentsPage component
  const StudentsPage = () => (
    <div className="flex flex-col h-screen">
      <header className="flex items-center justify-between p-4 bg-blue-600 text-white">
        <h1 className="text-2xl font-bold">Students</h1>
        <Button className="bg-blue-700 hover:bg-blue-800" onClick={() => setView('selectInstitute')}>
          <Plus className="mr-2 h-4 w-4" /> New Student
        </Button>
      </header>
      <main className="flex-1 p-4 bg-gray-100">
        <div className="flex flex-wrap gap-2 mb-4">
        <Input
        className="w-40"
        placeholder="Search by name, institute, or roll number"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
          <Button className="bg-blue-900 hover:bg-blue-700" onClick={downloadExcel}>
            Download Excel
          </Button>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Student List</h2>
          {filteredStudents.length > 0 ? (
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-200">
                  <th className="py-2 px-4">Name</th>
                  <th className="py-2 px-4">Degree</th>
                  <th className="py-2 px-4">Course</th>
                  <th className="py-2 px-4">Academic Year</th>
                  <th className="py-2 px-4">Roll Number</th>
                  <th className="py-2 px-4">Institute</th>
                  <th className="py-2 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student, index) => (
                  <tr
                    key={student._id}
                    className={`${index % 2 === 1 ? 'bg-gray-100' : ''}`}
                  >
                    <td className="py-2 px-4">{student.name}</td>
                    <td className="py-2 px-4">{student.degree}</td>
                    <td className="py-2 px-4">{student.course}</td>
                    <td className="py-2 px-4">{student.academicYear}</td>
                    <td className="py-2 px-4">{student.rollNumber}</td>
                    <td className="py-2 px-4">{student.institute}</td>
                    <td className="py-2 px-4">
                      <div className="flex items-center justify-center space-x-4">
                        <Button
                          className="ml-4 bg-white-600 hover:bg-black-100"
                          variant="ghost"
                          size="icon"
                          onClick={() => setSelectedStudent(student)}
                        >
                          <Eye className="h-6 w-6" />
                        </Button>
                        <Button
                          className="mr-4 bg-white-600 hover:bg-black-100"
                          variant="ghost"
                          size="icon"
                          onClick={() => confirmDeleteStudent(student._id)}
                        >
                          <Trash2 className="h-6 w-6" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEditStudentDialog(student)}
                        >
                          <Edit className="h-6 w-6" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500">No students found. Please add a new student.</p>
          )}
        </div>


      </main >
    </div >
  );

  const openEditStudentDialog = (student) => {
    setEditStudentData(student);
    console.log(editStudentData)
    setIsEditMode(true); // Set to edit mode
  };

  const handleEditStudentChange = (e) => {
    const { name, value } = e.target;
    setEditStudentData((prevData) => ({ ...prevData, [name]: value }));
  };

  const saveEditedStudent = async () => {
    try {
      await axios.put(`https://smartfee-kappa.vercel.app/api/students/updateStudent/${editStudentData._id}`, editStudentData);
      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student._id === editStudentData._id ? editStudentData : student
        )
      );
      setIsEditMode(false); // Close the dialog
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };





  // SelectInstituteDialog component
  const SelectInstituteDialog = () => (
    <Dialog open={view === 'selectInstitute'} onOpenChange={(open) => !open && setView('students')}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center">
            Select Institute
            <Button variant="ghost" size="icon" onClick={() => setView('students')}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="mb-2">The student studies in</p>
          <Input
            placeholder="Enter Institute Name"
            value={selectedInstitute}
            onChange={(e) => setSelectedInstitute(e.target.value)}
            required
          />
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => setView('students')}>Cancel</Button>
          <Button onClick={() => setView('createStudent')}>Start creating student</Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  // CreateStudentForm component
  const CreateStudentForm = () => {
    const [name, setName] = useState("");
    const [degree, setDegree] = useState("");
    const [course, setCourse] = useState("");
    const [academicYear, setAcademicYear] = useState("");
    const [rollNumber, setRollNumber] = useState("");
    const [primaryContactName, setPrimaryContactName] = useState("");
    const [primaryContactNumber, setPrimaryContactNumber] = useState("");
    const [primaryContactEmail, setPrimaryContactEmail] = useState("");

    const handleSubmit = async (e) => {
      e.preventDefault();

      // Prepare the student data according to the updated schema
      const studentData = {
        name,
        degree,
        course,
        academicYear,
        rollNumber,
        primaryContact: {
          name: primaryContactName,
          number: primaryContactNumber,
          email: primaryContactEmail
        },
        institute: selectedInstitute
      };

      try {
        const response = await axios.post('https://smartfee-kappa.vercel.app/api/students/addStudent', studentData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        setAddedStudentName(studentData.name);
        setAddedStudentDegree(studentData.degree);
        setAddedStudentCourse(studentData.course);
        setAddedStudentRoll(studentData.rollNumber);
        setAddedStudentNumber(studentData.primaryContact.number);
        setAddedStudentEmail(studentData.primaryContact.email);


        setShowSuccessPopup(true);
      } catch (error) {
        console.error("Error adding student:", error.response?.data || error.message);
      }
    };

    return (
      <div className="flex flex-col h-screen bg-gray-100">
        <header className="bg-blue-600 text-white p-4 flex items-center">
          <Button variant="ghost" className="mr-2" onClick={() => setView('students')}>
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-xl font-semibold">Create Student</h1>
        </header>
        <div className="flex-1 overflow-auto p-6">
          <h2 className="text-lg font-semibold mb-2">{selectedInstitute}</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Basic details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Student Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <Input
                  placeholder="Degree"
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
                  required
                />
                <Input
                  placeholder="Course"
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  required
                />
                <Input
                  placeholder="Academic Year"
                  value={academicYear}
                  onChange={(e) => setAcademicYear(e.target.value)}
                  required
                />
                <Input
                  placeholder="Roll Number"
                  value={rollNumber}
                  onChange={(e) => setRollNumber(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Primary contact details</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  placeholder="Primary Contact Name"
                  value={primaryContactName}
                  onChange={(e) => setPrimaryContactName(e.target.value)}
                  required
                />
                <Input
                  placeholder="Primary Contact Number"
                  value={primaryContactNumber}
                  onChange={(e) => setPrimaryContactNumber(e.target.value)}
                  required
                />
                <Input
                  placeholder="Primary Contact Email"
                  type="email"
                  value={primaryContactEmail}
                  onChange={(e) => setPrimaryContactEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="flex justify-between">
              <Button variant="outline" type="button" onClick={() => setView('students')}>Discard Student</Button>
              <Button type="submit">Add Student</Button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // SuccessPopup component
  const SuccessPopup = () => (
    <Dialog open={showSuccessPopup} onOpenChange={setShowSuccessPopup}>
      <DialogContent className="sm:max-w-[425px]">
        <div className="bg-green-500 p-6 rounded-t-lg">
          <div className="flex justify-center">
            <div className="bg-white rounded-full p-2">
              <Check className="h-8 w-8 text-green-500" />
            </div>
          </div>
        </div>
        <div className="p-6 text-center">
          <h2 className="text-xl font-semibold mb-2">Student Added</h2>
          <p className="mb-4">{addedStudentName} has been added to {selectedInstitute}</p>

          <div className="flex flex-col items-center justify-center gap-4">
            <Button className="w-full" onClick={() => {
              setShowSuccessPopup(false);
              setView('students');
            }}>
              View Student
            </Button>
            <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => {
              setShowSuccessPopup(false);
              setView('editFee');
            }}>
              Confirm Student Fee
            </Button>
          </div>
        </div>

      </DialogContent>
    </Dialog>
  );



  return (

    <div>
      {isEditMode && (
        <Dialog open={isEditMode} onOpenChange={() => setIsEditMode(false)}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Student</DialogTitle>
              <Button variant="ghost" size="icon" onClick={() => setIsEditMode(false)}>
                <X className="h-4 w-4" />
              </Button>
            </DialogHeader>
            <div className="py-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700" htmlFor="name">Name</label>
                <Input
                  id="name"
                  name="name"
                  value={editStudentData.name}
                  onChange={handleEditStudentChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700" htmlFor="degree">Degree</label>
                <Input
                  id="degree"
                  name="degree"
                  value={editStudentData.degree}
                  onChange={handleEditStudentChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700" htmlFor="course">Course</label>
                <Input
                  id="course"
                  name="course"
                  value={editStudentData.course}
                  onChange={handleEditStudentChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700" htmlFor="academicYear">Academic Year</label>
                <Input
                  id="academicYear"
                  name="academicYear"
                  value={editStudentData.academicYear}
                  onChange={handleEditStudentChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700" htmlFor="rollNumber">Roll Number</label>
                <Input
                  id="rollNumber"
                  name="rollNumber"
                  value={editStudentData.rollNumber}
                  onChange={handleEditStudentChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700" htmlFor="institute">Institute</label>
                <Input
                  id="institute"
                  name="institute"
                  value={editStudentData.institute}
                  onChange={handleEditStudentChange}
                />
              </div>
            </div>
            <Button onClick={saveEditedStudent}>
              <Check className="mr-2 h-4 w-4" /> Save Changes
            </Button>
          </DialogContent>
        </Dialog>
      )}



      {view === 'students' && <StudentsPage />}
      {view === 'selectInstitute' && <SelectInstituteDialog />}
      {view === 'createStudent' && <CreateStudentForm />}
      {view === 'editFee' && <EditFeePage />}
      {selectedStudent && <StudentDetail student={selectedStudent} />}
      {showSuccessPopup && <SuccessPopup />}
    </div>

  );
}