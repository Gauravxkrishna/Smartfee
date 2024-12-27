import React, { useState } from 'react';

const OfflineFeeCollection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [student, setStudent] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [receipt, setReceipt] = useState(null);

  const studentsDatabase = [
    { id: 1, name: 'John Doe', rollNumber: '101', feeDue: 500 },
    { id: 2, name: 'Jane Smith', rollNumber: '102', feeDue: 300 },
    // Add more students here
  ];

  const handleSearch = () => {
    const foundStudent = studentsDatabase.find(
      (student) => student.rollNumber === searchQuery
    );
    setStudent(foundStudent || null);
  };

  const handlePayment = () => {
    if (!student) return;

    const updatedReceipt = {
      name: student.name,
      rollNumber: student.rollNumber,
      amountPaid: paymentAmount,
      remainingBalance: student.feeDue - paymentAmount,
      date: new Date().toLocaleDateString(),
    };
    
    setReceipt(updatedReceipt);
  };

  const handleDownloadReceipt = () => {
    if (!receipt) return;

    const receiptContent = `
      Receipt for Fee Payment:
      Name: ${receipt.name}
      Roll Number: ${receipt.rollNumber}
      Amount Paid: ${receipt.amountPaid}
      Remaining Balance: ${receipt.remainingBalance}
      Date: ${receipt.date}
    `;
    
    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `receipt_${receipt.rollNumber}.txt`;
    link.click();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Offline Fee Collection</h1>

        <div className="mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Enter Student Roll Number"
            className="p-2 border border-gray-300 rounded w-full"
          />
          <button
            onClick={handleSearch}
            className="mt-2 p-2 bg-blue-500 text-white rounded w-full hover:bg-blue-600"
          >
            Search Student
          </button>
        </div>

        {student && (
          <div className="mb-6">
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold">Student Information</h2>
              <p>Name: {student.name}</p>
              <p>Roll Number: {student.rollNumber}</p>
              <p>Fee Due: ₹{student.feeDue}</p>
            </div>

            <div className="mt-6">
              <input
                type="number"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
                placeholder="Enter Payment Amount"
                className="p-2 border border-gray-300 rounded w-full"
              />
              <button
                onClick={handlePayment}
                className="mt-2 p-2 bg-green-500 text-white rounded w-full hover:bg-green-600"
              >
                Pay Fee
              </button>
            </div>
          </div>
        )}

        {receipt && (
          <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold">Payment Receipt</h2>
            <p>Name: {receipt.name}</p>
            <p>Roll Number: {receipt.rollNumber}</p>
            <p>Amount Paid: ₹{receipt.amountPaid}</p>
            <p>Remaining Balance: ₹{receipt.remainingBalance}</p>
            <p>Date: {receipt.date}</p>
            <button
              onClick={handleDownloadReceipt}
              className="mt-4 p-2 bg-teal-500 text-white rounded hover:bg-teal-600"
            >
              Download Receipt
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OfflineFeeCollection;
