import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HeroSection from './components/HeroSection';
import InstituteLoginForm from './components/Login/InstituteLoginForm'
import AdminDashboard from './pages/AdminDashboard';
import InstituteDashboard from './pages/InstituteDashboard';
import StudentDashboard from './pages/StudentDashboard';
import ReportPage from './pages/ReportPage'
import StudentLogin from './components/Login/StudentLogin';
import EditFeePage from './pages/EditFeePage';
import FeeSummaryPage from './pages/FeeSummaryPage';
import StudentPage from './pages/StudentPage';
import { StudentProvider } from './pages/StudentContext';
import TransactionPage from './pages/TransactionPage'
import BulkActionPage from './pages/BulkActionPage'
import OfflinePaymentPage from './pages/offlinePaymentPage'
// import StudentPage from './pages/StudentPage'

function App() {
  return (
    <Router>
      <div>

        <StudentProvider>
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/admin" element={<AdminDashboard />}/>
          <Route path="/institute" element={<InstituteDashboard />}/>
          <Route path="/student" element={<StudentDashboard />}/>
          <Route path="/reports" element={<ReportPage />}/>


          <Route path="/student/editFeePage" element={<EditFeePage />}/>
          <Route path="/student/FeeSummaryPage" element={<FeeSummaryPage />}/>
          <Route path="/student/Studentpage" element={<StudentPage />}/>
          <Route path="/student/StudentProvider" element={<StudentProvider />}/>
      
          
          {/* Add institute routes */}
          <Route path="/institute/students" element={<StudentDashboard />} />
          <Route path="/institute/instant-pay" element={<h1>Instant Pay</h1>} />
          <Route path="/institute/auto-pay" element={<h1>Auto Pay</h1>} />
          {/* <Route path="/institute/reports" element={<ReportDashboard/>} /> */}
          <Route path="/institute/transactions" element={<h1>Transaction History</h1>} />
          <Route path="/institute-login" element={<InstituteLoginForm/>} />
          <Route path="/student-login" element={<StudentLogin/>} />
          <Route path="/transaction" element={<h1><TransactionPage/> </h1>} />
          <Route path="/bulk-action" element={<h1><BulkActionPage/> </h1>} />
          <Route path="/offline-payment" element={<h1><OfflinePaymentPage/> </h1>} />
          {/* <Route path="/bulk-action" element={<BulkActionPage/>} /> */}

          {/* Redirect to a default page for institute */}
          <Route path="/institute/*" element={<Navigate to="/institute" replace />} />
        </Routes>

        </StudentProvider>
      </div>
    </Router>
  );
}

export default App;

