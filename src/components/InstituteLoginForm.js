import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const InstituteLoginForm = () => {
  const [instituteName, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/institutes/login', { instituteName, password });
      if (response.status === 200) {
        //Redirect to the institute dashboard instead of using the name in the URL
        navigate('/institute/dashboard');
        alert('Logged in successfully.');
      }
    } catch (error) {
      console.error('Login failed:', error);
      // You can improve this to show a specific error message from the response if available
      alert('Invalid credentials, please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Institute Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Institute Name"
            value={instituteName}
            onChange={(e) => setName(e.target.value)}
            required
            className="border border-gray-300 p-2 mb-4 w-full"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border border-gray-300 p-2 mb-4 w-full"
          />
          <button type="submit" className="bg-[#003366] text-white px-4 py-2 rounded">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default InstituteLoginForm;


