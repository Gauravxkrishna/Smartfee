import React, { useState } from 'react';
import axios from 'axios';

const AdminPage = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleAddInstitute = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/institutes', { name, password });
      alert(response.data.message);
      // Reset the form
      setName('');
      setPassword('');
    } catch (error) {
      alert('Error creating institute: ' + error.response.data.message);
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Add Institute</h2>
      <form onSubmit={handleAddInstitute}>
        <input
          type="text"
          placeholder="Institute Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Add Institute</button>
      </form>
    </div>
  );
};

export default AdminPage;
