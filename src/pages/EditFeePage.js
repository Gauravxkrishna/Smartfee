import React, { useState, useEffect } from 'react';
import { ArrowLeft, Mail, Phone, Save, XCircle, Plus, Trash } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useStudentContext } from './StudentContext';
import axios from 'axios';


function EditFeePage() {
  const navigate = useNavigate();
  const { selectedInstitute, addedStudentName, AddedStudentCourse, AddedStudentDegree, AddedStudentRoll, AddedStudentNumber, AddedStudentEmail } = useStudentContext();

  const [originalComponents] = useState([
    { name: 'Donation', feeAmount: '100000', paidAmount: '0', discount: '0', payableFee: 100000 },
    { name: 'Tuition Fee', feeAmount: '400000', paidAmount: '0', discount: '0', payableFee: 400000 },
    { name: 'Mess Fee', feeAmount: '120000', paidAmount: '0', discount: '0', payableFee: 120000 },
    { name: 'Hostel Fee', feeAmount: '240000', paidAmount: '0', discount: '0', payableFee: 240000 },
    { name: 'Uniform Fee', feeAmount: '0', paidAmount: '0', discount: '0', payableFee: 0 },
  ]);

  // Retrieve the fee components from localStorage or default to originalComponents
  const [feeComponents, setFeeComponents] = useState(() => {
    const savedComponents = localStorage.getItem('feeComponents');
    return savedComponents ? JSON.parse(savedComponents) : originalComponents;
  });

  const updatePayableFee = (component) => {
    const feeAmount = parseFloat(component.feeAmount) || 0;
    const paidAmount = parseFloat(component.paidAmount) || 0;
    const discount = parseFloat(component.discount) || 0;
    return Math.max(feeAmount - paidAmount - discount, 0);
  };

  const handleInputChange = (index, field, value) => {
    const newComponents = [...feeComponents];
    newComponents[index] = {
      ...newComponents[index],
      [field]: value === '0' ? '' : value.replace(/^0+/, ''),
    };
    newComponents[index].payableFee = updatePayableFee(newComponents[index]);
    setFeeComponents(newComponents);
  };

  const handleAddComponent = () => {
    const newComponent = {
      name: 'New Fee Component',
      feeAmount: '0',
      paidAmount: '0',
      discount: '0',
      payableFee: 0,
    };
    const updatedComponents = [...feeComponents, newComponent];
    setFeeComponents(updatedComponents);
    localStorage.setItem('feeComponents', JSON.stringify(updatedComponents));  // Save to localStorage
  };

  const handleRemoveComponent = (index) => {
    const newComponents = feeComponents.filter((_, i) => i !== index);
    setFeeComponents(newComponents);
    localStorage.setItem('feeComponents', JSON.stringify(newComponents));  // Save to localStorage
  };

  const handleSave = async () => {
    const feeSummary = calculateFeeSummary(feeComponents);
  
    try {
      const response = await axios.post('http://localhost:5000/api/students/addStudent', {
        name: addedStudentName,
        degree: AddedStudentDegree,
        course: AddedStudentCourse,
        academicYear: "2024", // Add actual year input dynamically if needed
        rollNumber: AddedStudentRoll,
        primaryContact: {
          name: addedStudentName,
          number: AddedStudentNumber,
          email: AddedStudentEmail,
        },
        institute: selectedInstitute,
        feeDetails: feeComponents, // Save fee details
        feeSummary: feeSummary, // Save fee summary
      });
  
      console.log("Student saved successfully:", response.data);
      navigate('/student/FeeSummaryPage'); // Redirect on success
    } catch (error) {
      if (error.response) {
        console.error("Error saving student:", error.response.data.message);
      } else {
        console.error("Server error:", error.message);
      }
    }
  };
  
  // Helper function to calculate fee summary
  const calculateFeeSummary = (feeDetails) => {
    const totalAmount = feeDetails.reduce((sum, component) => sum + (parseFloat(component.feeAmount) || 0), 0);
    const paidAmount = feeDetails.reduce((sum, component) => sum + (parseFloat(component.paidAmount) || 0), 0);
    const discount = feeDetails.reduce((sum, component) => sum + (parseFloat(component.discount) || 0), 0);
    const unpaidAmount = totalAmount - paidAmount - discount;
  
    return {
      totalAmount,
      paidAmount,
      unpaidAmount,
    };
  };
  
  
  

  const calculateTotal = (field) => {
    return feeComponents.reduce((sum, component) => sum + (parseFloat(component[field]) || 0), 0);
  };

  useEffect(() => {
    // Save the fee components to localStorage whenever they change
    localStorage.setItem('feeComponents', JSON.stringify(feeComponents));
  }, [feeComponents]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-4">
            <Link to="/institute" className="hover:opacity-80">
              <ArrowLeft className="w-6 h-6" />
            </Link>
          </div>
          <h1 className="text-2xl font-semibold">{addedStudentName}</h1>
          <p className="text-blue-100">{selectedInstitute} | {AddedStudentRoll} | {AddedStudentDegree} | {AddedStudentCourse}</p>
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>{AddedStudentNumber}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span>{AddedStudentEmail}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Fee Table Section */}
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold p-6 border-b">Edit Fee Components</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 text-left">Component</th>
                  <th className="p-2 text-left">Fee Amount</th>
                  <th className="p-2 text-left">Paid Amount</th>
                  <th className="p-2 text-left">Discount</th>
                  <th className="p-2 text-left">Payable Fee</th>
                  <th className="p-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {feeComponents.map((component, index) => (
                  <tr key={index} className="border-b">
                    {/* Editable Name Field */}
                    <td className="p-2 font-medium">
                      <input
                        type="text"
                        value={component.name}
                        onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                        className="w-40 p-1 border rounded"
                      />
                    </td>
                    {/* Editable Fee Amount */}
                    <td className="p-2">
                      <div className="flex items-center">
                        <span className="mr-1">₹</span>
                        <input
                          type="text"
                          value={component.feeAmount}
                          onChange={(e) => handleInputChange(index, 'feeAmount', e.target.value)}
                          className="w-24 p-1 border rounded"
                        />
                      </div>
                    </td>
                    {/* Editable Paid Amount */}
                    <td className="p-2">
                      <input
                        type="text"
                        value={component.paidAmount}
                        onChange={(e) => handleInputChange(index, 'paidAmount', e.target.value)}
                        className="w-24 p-1 border rounded"
                      />
                    </td>
                    {/* Editable Discount */}
                    <td className="p-2">
                      <input
                        type="text"
                        value={component.discount}
                        onChange={(e) => handleInputChange(index, 'discount', e.target.value)}
                        className="w-24 p-1 border rounded"
                      />
                    </td>
                    {/* Payable Fee (Non-editable) */}
                    <td className="p-2 font-medium">
                      ₹{component.payableFee.toLocaleString('en-IN')}
                    </td>
                    {/* Remove Button */}
                    <td className="p-2">
                      <button
                        onClick={() => handleRemoveComponent(index)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <Trash className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
                {/* Add New Component Button */}
                <tr>
                  <td colSpan="6" className="p-4 text-center">
                    <button
                      onClick={handleAddComponent}
                      className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Fee Component
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Action Buttons */}
          <div className="p-6 flex justify-between items-center border-t">
            <button onClick={() => setFeeComponents(originalComponents)} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
              <XCircle className="w-4 h-4 mr-2" />
              Discard
            </button>
            <button onClick={handleSave} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditFeePage;
