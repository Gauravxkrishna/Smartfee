import React, { useState } from 'react';

const OfflinePayments = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [studentDetails, setStudentDetails] = useState(null);
  const [payments, setPayments] = useState([
    {
      paymentMode: '',
      bankName: '',
      referenceNo: '',
      referenceDate: '',
      dueName: '',
      payableAmount: '',
      dues: '',
      semesterPayable: '',
    },
  ]);
  const [successMessage, setSuccessMessage] = useState(''); // To store the success message

  const duesData = {
    Semester: '₹50,000',
    Mess: '₹5,000',
    Hostel: '₹20,000',
    Transportation: '₹10,000',
    Uniform: '₹2,000',
  };

  const handleSearch = () => {
    const mockStudent = {
      admissionNumber: '12345',
      studentName: 'John Doe',
      fathersName: 'Robert Doe',
      department: 'Computer Science',
      sessionOfAdmission: '2022-2026',
      course: 'B.Tech',
      currentSemester: '5th',
      admissionStatus: 'Active',
      subStatus: 'Regular',
      lateralEntry: 'No',
    };
    setStudentDetails(mockStudent);
  };

  const handlePaymentChange = (index, field, value) => {
    const updatedPayments = [...payments];
    updatedPayments[index][field] = value;

    // Update dues when dueName is changed
    if (field === 'dueName') {
      updatedPayments[index].dues = duesData[value] || '';
    }

    setPayments(updatedPayments);
  };

  const addPayment = () => {
    setPayments([
      ...payments,
      {
        paymentMode: '',
        bankName: '',
        referenceNo: '',
        referenceDate: '',
        dueName: '',
        payableAmount: '',
        dues: '',
        semesterPayable: '',
      },
    ]);
  };

  const savePayments = () => {
    console.log('Saving payments:', payments);
    setSuccessMessage('Payment successfully saved!'); // Set success message

    // Reset all fields
    setPayments([
      {
        paymentMode: '',
        bankName: '',
        referenceNo: '',
        referenceDate: '',
        dueName: '',
        payableAmount: '',
        dues: '',
        semesterPayable: '',
      },
    ]);
    setSearchTerm('');
    setStudentDetails(null);

    // Clear the success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  return (
    <div className="p-6 mx-auto bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Offline Payment</h2>

      {/* Display Success Message */}
      {successMessage && (
        <div className="mb-4 p-4 text-green-800 bg-green-100 border border-green-200 rounded">
          {successMessage}
        </div>
      )}

      {/* Search Bar */}
      <div className="mb-6 flex items-center space-x-2">
        <input
          type="text"
          placeholder="Search by Admission Number"
          className="flex-grow border border-gray-300 rounded p-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      {/* Student Details */}
      {studentDetails && (
        <div className="mb-6 border p-4 rounded bg-gray-50">
          <h2 className="text-lg font-semibold mb-4">Student Details</h2>
          <div className="grid grid-cols-3 gap-4">
            <p><strong>Admission Number:</strong> {studentDetails.admissionNumber}</p>
            <p><strong>Student Name:</strong> {studentDetails.studentName}</p>
            <p><strong>Father's Name:</strong> {studentDetails.fathersName}</p>
            <p><strong>Department:</strong> {studentDetails.department}</p>
            <p><strong>Session of Admission:</strong> {studentDetails.sessionOfAdmission}</p>
            <p><strong>Course:</strong> {studentDetails.course}</p>
            <p><strong>Current Semester:</strong> {studentDetails.currentSemester}</p>
            <p><strong>Admission Status:</strong> {studentDetails.admissionStatus}</p>
            <p><strong>Sub-Status:</strong> {studentDetails.subStatus}</p>
            <p><strong>Lateral Entry:</strong> {studentDetails.lateralEntry}</p>
          </div>
        </div>
      )}

      {/* Payment Details */}
      {studentDetails && (
        <div className="mb-6 border p-4 rounded bg-gray-50">
          <h2 className="text-lg font-semibold mb-4">Payment Details</h2>
          {payments.map((payment, index) => (
            <div key={index} className="mb-4 border p-4 rounded bg-white">
              <div className="grid grid-cols-6 gap-4">
                <div>
                  <label className="block mb-2 text-sm font-medium">Payment Mode</label>
                  <select
                    className="w-full border border-gray-300 rounded p-2"
                    value={payment.paymentMode}
                    onChange={(e) => handlePaymentChange(index, 'paymentMode', e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="Cash">Cash</option>
                    <option value="Online">Online</option>
                  </select>
                </div>

                {payment.paymentMode === 'Online' && (
                  <div>
                    <label className="block mb-2 text-sm font-medium">Bank Name</label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded p-2"
                      value={payment.bankName}
                      onChange={(e) => handlePaymentChange(index, 'bankName', e.target.value)}
                    />
                  </div>
                )}

                <div>
                  <label className="block mb-2 text-sm font-medium">Reference No</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded p-2"
                    value={payment.referenceNo}
                    onChange={(e) => handlePaymentChange(index, 'referenceNo', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium">Reference Date</label>
                  <input
                    type="date"
                    className="w-full border border-gray-300 rounded p-2"
                    value={payment.referenceDate}
                    onChange={(e) => handlePaymentChange(index, 'referenceDate', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium">Due Name</label>
                  <select
                    className="w-full border border-gray-300 rounded p-2"
                    value={payment.dueName}
                    onChange={(e) => handlePaymentChange(index, 'dueName', e.target.value)}
                  >
                    <option value="">Select</option>
                    {Object.keys(duesData).map((dueName) => (
                      <option key={dueName} value={dueName}>{dueName}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium">Payable Amount</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded p-2"
                    value={payment.payableAmount}
                    onChange={(e) => handlePaymentChange(index, 'payableAmount', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium">Dues</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded p-2"
                    value={payment.dues}
                    readOnly
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium">Semester Payable For</label>
                  <select
                    className="w-full border border-gray-300 rounded p-2"
                    value={payment.semesterPayable}
                    onChange={(e) => handlePaymentChange(index, 'semesterPayable', e.target.value)}
                  >
                    <option value="">Select Semester</option>
                    <option value="1st Semester">1st Semester</option>
                    <option value="2nd Semester">2nd Semester</option>
                    <option value="3rd Semester">3rd Semester</option>
                    <option value="4th Semester">4th Semester</option>
                    <option value="5th Semester">5th Semester</option>
                    <option value="6th Semester">6th Semester</option>
                    <option value="7th Semester">7th Semester</option>
                    <option value="8th Semester">8th Semester</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
          <button
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
            onClick={addPayment}
          >
            Add Payment
          </button>
        </div>
      )}

      {/* Save Payments Button */}
      {studentDetails && (
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          onClick={savePayments}
        >
          Save Payments
        </button>
      )}
    </div>
  );
};

export default OfflinePayments;