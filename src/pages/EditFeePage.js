import React, { useState, useContext } from 'react';
import { ArrowLeft, Mail, Phone, Save, XCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useStudentContext } from './StudentContext';   // Make sure to import the context

function EditFeePage() {
  const navigate = useNavigate();
  
  const { selectedInstitute, addedStudentName,AddedStudentCourse,AddedStudentDegree,AddedStudentRoll,AddedStudentNumber,AddedStudentEmail,} = useStudentContext(); 
  // Get student data from context
   // Assuming the context provides student and institute

  const [originalComponents] = useState([
    { name: 'Donation', feeAmount: '100000', paidAmount: '0', discount: '0', payableFee: 100000 },
    { name: 'Tuition Fee', feeAmount: '400000', paidAmount: '0', discount: '0', payableFee: 400000 },
    { name: 'Mess Fee', feeAmount: '120000', paidAmount: '0', discount: '0', payableFee: 120000 },
    { name: 'Hostel Fee', feeAmount: '240000', paidAmount: '0', discount: '0', payableFee: 240000 },
    { name: 'Uniform Fee', feeAmount: '0', paidAmount: '0', discount: '0', payableFee: 0 },
  ]);
  const [feeComponents, setFeeComponents] = useState(originalComponents);

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

  const handleSave = () => {
    localStorage.setItem('feeComponents', JSON.stringify(feeComponents));
    navigate('/student/FeeSummaryPage');
  };

  const calculateTotal = (field) => {
    return feeComponents.reduce((sum, component) => sum + (parseFloat(component[field]) || 0), 0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-4">
            <Link to="/institute" className="hover:opacity-80">
              <ArrowLeft className="w-6 h-6" />
            </Link>
          </div>
          <h1 className="text-2xl font-semibold">{addedStudentName}</h1>
          <p className="text-blue-100">{selectedInstitute}| {AddedStudentRoll}| {AddedStudentDegree}| {AddedStudentCourse}</p>
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

      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold p-6 border-b">Edit Fee Components</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-white-100">
                  <th className="p-2 text-left">Component</th>
                  <th className="p-2 text-left">Fee Amount</th>
                  <th className="p-2 text-left">Paid Amount</th>
                  <th className="p-2 text-left">Discount</th>
                  <th className="p-2 text-left">Payable Fee</th>
                </tr>
              </thead>
              <tbody>
                {feeComponents.map((component, index) => (
                  <tr key={component.name} className="border-b">
                    <td className="p-2 font-medium">{component.name}</td>
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
                    <td className="p-2">
                      <div className="flex items-center">
                        <span className="mr-1">₹</span>
                        <input
                          type="text"
                          value={component.paidAmount}
                          onChange={(e) => handleInputChange(index, 'paidAmount', e.target.value)}
                          className="w-24 p-1 border rounded"
                        />
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="flex items-center">
                        <span className="mr-1">₹</span>
                        <input
                          type="text"
                          value={component.discount}
                          onChange={(e) => handleInputChange(index, 'discount', e.target.value)}
                          className="w-24 p-1 border rounded"
                        />
                      </div>
                    </td>
                    <td className="p-2 font-medium">
                      ₹{component.payableFee.toLocaleString('en-IN')}
                    </td>
                  </tr>
                ))}
                {/* Total Row */}
                <tr className="border-b bg-white-100 font-semibold">
                  <td className="p-2">Total</td>
                  <td className="p-2">₹{calculateTotal('feeAmount').toLocaleString('en-IN')}</td>
                  <td className="p-2">₹{calculateTotal('paidAmount').toLocaleString('en-IN')}</td>
                  <td className="p-2">₹{calculateTotal('discount').toLocaleString('en-IN')}</td>
                  <td className="p-2">
                    ₹{calculateTotal('payableFee').toLocaleString('en-IN')}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="p-6 flex justify-between items-center border-t">
            <button
              onClick={() => setFeeComponents(originalComponents)}
              className="flex items-center px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              <XCircle className="w-4 h-4 mr-2" />
              Discard
            </button>
            <button
              onClick={handleSave}
              className="flex items-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
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