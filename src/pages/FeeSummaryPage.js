import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, CheckCircle } from 'lucide-react';

function FeeSummaryPage() {
  const [showNotification, setShowNotification] = useState(false);
  const [feeComponents, setFeeComponents] = useState([]);
  const [summaryData, setSummaryData] = useState({
    totalAmount: 0,
    paidAmount: 0,
    unpaidAmount: 0,
  });

 

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const success = urlParams.get('success');
    if (success === 'true') {
      setShowNotification(true);
    }

    const storedComponents = localStorage.getItem('feeComponents');
    if (storedComponents) {
      const parsedComponents = JSON.parse(storedComponents);
      setFeeComponents(parsedComponents);

      const total = parsedComponents.reduce(
        (sum, component) => sum + (parseFloat(component.feeAmount) || 0),
        0
      );
      const paid = parsedComponents.reduce(
        (sum, component) => sum + (parseFloat(component.paidAmount) || 0),
        0
      );

      setSummaryData({
        totalAmount: total,
        paidAmount: paid,
        unpaidAmount: total - paid,
      });
    }
  }, []);

  const handleEdit = () => {
    setShowNotification(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {showNotification && (
        <div className="fixed top-0 left-0 right-0 p-4 bg-green-100 border-b border-green-300">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-2">
              <CheckCircle className="text-green-600" />
              <span>Fee details updated successfully!</span>
            </div>
            <button onClick={() => setShowNotification(false)}>
              <X className="text-gray-500" />
            </button>
          </div>
        </div>
      )}

      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-semibold">Fee Summary</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        

        {/* Fee Summary Details Section */}
        <div className="bg-white shadow-lg rounded-lg mb-6">
          <h2 className="text-2xl font-bold p-6 border-b">Fee Summary Details</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 text-left">Component</th>
                  <th className="p-2 text-left">Fee Amount</th>
                  <th className="p-2 text-left">Paid Amount</th>
                  <th className="p-2 text-left">Discount</th>
                  <th className="p-2 text-left">Payable Fee</th>
                </tr>
              </thead>
              <tbody>
                {feeComponents.map((component) => (
                  <tr key={component.name} className="border-b">
                    <td className="p-2">{component.name}</td>
                    <td className="p-2">₹{component.feeAmount}</td>
                    <td className="p-2">₹{component.paidAmount}</td>
                    <td className="p-2">₹{component.discount}</td>
                    <td className="p-2">₹{component.payableFee.toLocaleString('en-IN')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Fee Summary Box */}
          <div className="p-6">
            <div className="flex justify-between gap-6">
              <div className="flex flex-col items-center p-4 bg-blue-100 rounded-lg w-1/3">
                <span className="text-sm font-medium">Total Fee Amount</span>
                <span className="text-xl font-bold text-blue-600">
                  ₹{summaryData.totalAmount.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex flex-col items-center p-4 bg-blue-100 rounded-lg w-1/3">
                <span className="text-sm font-medium">Total Paid Amount</span>
                <span className="text-xl font-bold text-blue-600">
                  ₹{summaryData.paidAmount.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex flex-col items-center p-4 bg-blue-100 rounded-lg w-1/3">
                <span className="text-sm font-medium">Remaining Unpaid Amount</span>
                <span className="text-xl font-bold text-blue-600">
                  ₹{summaryData.unpaidAmount.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>

          <div className="flex justify-end p-6 border-t">
            <Link
              to="/student/editFeePage"
              onClick={handleEdit}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Edit Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeeSummaryPage;
