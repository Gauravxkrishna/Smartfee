import React, { useState } from 'react';
import axios from 'axios';

const AdminPage = () => {
  const [instituteName, setInstituteName] = useState('');
  const [password, setPassword] = useState('');

  const handleAddInstitute = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/v1/createInstitute', { instituteName, password });
      alert(response.data.message);
      // Reset the form
      setInstituteName('');
      setPassword('');
    } catch (error) {
      alert('Error creating institute: ' + error.response.data.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-xs">
        <h2 className="text-center text-2xl font-bold mb-4">Add Institute</h2>
        <form onSubmit={handleAddInstitute} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <input
            type="text"
            placeholder="Institute Name"
            value={instituteName}
            onChange={(e) => setInstituteName(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-4"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-4"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
          >
            Add Institute
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminPage;
