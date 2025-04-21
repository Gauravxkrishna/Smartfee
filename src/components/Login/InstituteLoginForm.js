import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const InputField = ({ type, name, value, onChange, placeholder, label }) => (
  <div className="mb-4">
    <label htmlFor={name} className="block text-lg font-medium text-black mb-2">{label}</label>
    <input
      type={type}
      name={name}
      id={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required
      className="border border-blue-300 p-4 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
      aria-label={label}
    />
  </div>
);

const InstituteLoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear previous error message

    try {
      const response = await axios.post('https://smartfee-kappa.vercel.app/api/v1/instituteLogin', { email, password });

      if (response.status === 200) {
        navigate('/institute');
        alert('Logged in successfully.');
      }
    } catch (error) {
      console.error('Login failed:', error);

      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message || 'Invalid credentials, please try again.');
      } else {
        setErrorMessage('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300">
      <div className="flex w-full max-w-4xl px-4 md:px-8">
        <div className="bg-white p-10 rounded-xl shadow-lg w-full flex flex-col md:flex-row">
          {/* Left Section - Image */}
          <img
            src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg?semt=ais_hybrid"
            alt="Login Illustration"
            className="w-full md:w-1/2 h-auto mb-8 md:mb-0 md:mr-6"
          />

          {/* Right Section - Form */}
          <div className="w-full">
            <h2 className="text-2xl font-semibold text-center text-black mb-8">Institute Login</h2>

            {errorMessage && (
              <div className="bg-red-100 text-red-600 border border-red-500 p-4 mb-6 rounded-lg text-center">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <InputField
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                label="Email"
              />
              <InputField
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                label="Password"
              />
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
