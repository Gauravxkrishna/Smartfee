import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HeroSection from './components/HeroSection';



function App() {
  return (
    <Router>
      <div>
        
        <Routes>
          <Route path="/" element={<HeroSection />} />
      
          
          {/* Add institute routes */}
          <Route path="/institute/students" element={<h1>All Students</h1>} />
          <Route path="/institute/instant-pay" element={<h1>Instant Pay</h1>} />
          <Route path="/institute/auto-pay" element={<h1>Auto Pay</h1>} />
          <Route path="/institute/reports" element={<h1>Reports</h1>} />
          <Route path="/institute/transactions" element={<h1>Transaction History</h1>} />

          {/* Redirect to a default page for institute */}
          <Route path="/institute/*" element={<Navigate to="/institute/students" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

