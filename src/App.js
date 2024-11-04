import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HeroSection from './components/HeroSection';
import InstituteLoginForm from './components/InstituteLoginForm'
import AdminDashboard from './pages/AdminDashboard';
import InstituteDashboard from './pages/InstituteDashboard';
import StudentDashboard from './pages/StudentDashboard';
import ReportPage from './pages/ReportPage'
// import StudentPage from './pages/StudentPage'



function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/admin" element={<AdminDashboard />}/>
          <Route path="/institute" element={<InstituteDashboard />}/>
          <Route path="/student" element={<StudentDashboard />}/>
          <Route path="/reports" element={<ReportPage />}/>
      
          
          {/* Add institute routes */}
          <Route path="/institute/students" element={<StudentDashboard />} />
          <Route path="/institute/instant-pay" element={<h1>Instant Pay</h1>} />
          <Route path="/institute/auto-pay" element={<h1>Auto Pay</h1>} />
          {/* <Route path="/institute/reports" element={<ReportDashboard/>} /> */}
          <Route path="/institute/transactions" element={<h1>Transaction History</h1>} />
          <Route path="/institute-login" element={<InstituteLoginForm/>} />

          {/* Redirect to a default page for institute */}
          <Route path="/institute/*" element={<Navigate to="/institute/students" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

