import React, { createContext, useContext, useState } from "react";

// Create Context
const StudentContext = createContext();

// Create a provider component
export const StudentProvider = ({ children }) => {
  const [selectedInstitute, setSelectedInstitute] = useState("");
  const [addedStudentName, setAddedStudentName] = useState("");
  const [AddedStudentEmail, setAddedStudentEmail] = useState("");
    const [AddedStudentNumber, setAddedStudentNumber] = useState("");
    const [AddedStudentRoll, setAddedStudentRoll] = useState("");
    const [AddedStudentDegree, setAddedStudentDegree] = useState("");
    const [AddedStudentCourse, setAddedStudentCourse] = useState("");
  return (
    <StudentContext.Provider value={{ selectedInstitute, setSelectedInstitute, addedStudentName, setAddedStudentName,AddedStudentEmail, setAddedStudentEmail,AddedStudentNumber, setAddedStudentNumber,AddedStudentRoll, setAddedStudentRoll,AddedStudentDegree, setAddedStudentDegree ,AddedStudentCourse, setAddedStudentCourse}}>
      {children}
    </StudentContext.Provider>
  );
};

// Custom hook to use the context
export const useStudentContext = () => {
  return useContext(StudentContext);
};