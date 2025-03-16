import React from "react";
import { useRazorpay } from "react-razorpay";

const PaymentPage = () => {
  const { error, isLoading, Razorpay } = useRazorpay();

  const handlePayment = () => {
    const options = {
      key: "rzp_test_x5G2pcEDOW31pZ",
      amount: 50000, // Amount in paise (₹500)
      currency: "INR",
      name: "Test Company",
      description: "Test Transaction",
      order_id: "order_9A33XWu170gUtm", // Generate order_id on server
      handler: (response) => {
        console.log(response);
        alert("Payment Successful!");
      },
      prefill: {
        name: "John Doe",
        email: "john.doe@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#0d6efd", // Match primary color theme
      },
    };

    const razorpayInstance = new Razorpay(options);
    razorpayInstance.open();
  };

  // Mock transaction data for table
  const transactions = [
    { id: "TXN001", name: "John Doe", amount: "₹500", date: "2023-01-10", status: "Success" },
    { id: "TXN002", name: "Jane Smith", amount: "₹750", date: "2023-02-02", status: "Pending" },
    { id: "TXN003", name: "Alex Johnson", amount: "₹1,000", date: "2023-02-15", status: "Failed" },
  ];

  /************************************************************************
   * Below are inline styles to mimic a similar color theme as your demo. *
   ************************************************************************/
  const pageWrapperStyle = {
    minHeight: "100vh",
    backgroundColor: "#f8f9fa", // Light background
    padding: "20px",
    boxSizing: "border-box",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  const headerStyle = {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    marginBottom: "20px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  };

  const headerTitleStyle = {
    margin: 0,
    fontSize: "24px",
    fontWeight: 600,
    color: "#343a40",
  };

  const actionsRowStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "10px",
  };

  const searchInputStyle = {
    padding: "8px 12px",
    borderRadius: "4px",
    border: "1px solid #ced4da",
    marginRight: "10px",
    width: "250px",
    outline: "none",
  };

  const downloadBtnStyle = {
    padding: "8px 16px",
    border: "none",
    borderRadius: "4px",
    backgroundColor: "#0d6efd", // Primary color
    color: "#fff",
    cursor: "pointer",
    marginRight: "10px",
  };

  const payBtnStyle = {
    padding: "8px 16px",
    border: "none",
    borderRadius: "4px",
    backgroundColor: "#0d6efd", // Primary color
    color: "#fff",
    cursor: "pointer",
  };

  const cardStyle = {
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    padding: "20px",
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
  };

  const tableHeaderStyle = {
    backgroundColor: "#f5f5f5",
    textAlign: "left",
    padding: "10px",
    borderBottom: "1px solid #dee2e6",
    color: "#495057",
  };

  const tableCellStyle = {
    padding: "10px",
    borderBottom: "1px solid #dee2e6",
    color: "#495057",
  };

  const errorStyle = {
    color: "red",
    marginTop: "10px",
  };

  return (
    <div style={pageWrapperStyle}>
      {/* Page Header */}
      <div style={headerStyle}>
        <h2 style={headerTitleStyle}>Payments</h2>
        <div style={actionsRowStyle}>
          <div>
            <input
              type="text"
              placeholder="Search by name, transaction ID..."
              style={searchInputStyle}
            />
            <button style={downloadBtnStyle}>Download Excel</button>
          </div>
          <button
            style={payBtnStyle}
            onClick={handlePayment}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Pay Now"}
          </button>
        </div>
      </div>

      {/* Transactions Table */}
      <div style={cardStyle}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={tableHeaderStyle}>Transaction ID</th>
              <th style={tableHeaderStyle}>Name</th>
              <th style={tableHeaderStyle}>Amount</th>
              <th style={tableHeaderStyle}>Date</th>
              <th style={tableHeaderStyle}>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((txn) => (
              <tr key={txn.id}>
                <td style={tableCellStyle}>{txn.id}</td>
                <td style={tableCellStyle}>{txn.name}</td>
                <td style={tableCellStyle}>{txn.amount}</td>
                <td style={tableCellStyle}>{txn.date}</td>
                <td style={tableCellStyle}>{txn.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Loading & Error States */}
      {isLoading && <p>Loading Razorpay...</p>}
      {error && <p style={errorStyle}>Error loading Razorpay: {error}</p>}
    </div>
  );
};

export default PaymentPage;
