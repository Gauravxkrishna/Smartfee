import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const InstituteLoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Post the login credentials to the backend
      const response = await axios.post('http://localhost:5000/api/v1/instituteLogin', { 
        email, 
        password 
      });

      if (response.status === 200) {
        // Navigate to the dashboard upon successful login
        navigate('/institute');
        alert('Logged in successfully.');
      }
    } catch (error) {
      console.error('Login failed:', error);
      // Handling different error messages
      if (error.response && error.response.data) {
        alert(error.response.data.message || 'Invalid credentials, please try again.');
      } else {
        alert('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300">
      <div className="flex w-full max-w-4xl px-4 md:px-8"> {/* Increased width */}
        <div className="bg-white p-10 rounded-xl shadow-lg w-full">
          <h2 className="text-xl font-semibold text-center text-black mb-8">Institute Login</h2>
          
          <div className='flex'>
            <img 
              src='https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg?semt=ais_hybrid' 
              alt="Login Illustration" 
              className="w-1/2 h-auto mr-6" 
            />

            <form onSubmit={handleSubmit} className="space-y-6 w-full mt-10">
              {/* Email Input */}
              <div className="mb-4">
                <label htmlFor="email" className="text-lg font-medium text-black">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border border-blue-300 p-4 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                />
              </div>

              {/* Password Input */}
              <div className="mb-6">
                <label htmlFor="password" className="text-lg font-medium text-black">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border border-blue-300 p-4 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Login
              </button>
            </form>
          </div>

          
        </div>
      </div>
    </div>
  );
};

export default InstituteLoginForm;
