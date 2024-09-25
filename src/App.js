import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import FeeCollectionSection from './components/FeeCollectionSection';
import HowItWorksSection from './components/HowItWorksSection';
import TestimonialsSection from './components/TestimonialsSection';
import PricingSection from './components/PricingSection';
import CTASection from './components/CTASection';
import AdminPage from './components/AdminPage';
import InstituteLoginForm from './components/InstituteLoginForm';
import InstituteSidebar from './components/InstituteSidebar'; // Import the InstituteSidebar component
import AllStudentPage from './components/AllStudentPage';
import AddStudentPage from './components/AddStudentPage';

function App() {
  return (
    <Router>
      <div>
        {/* Render the sidebar if the path starts with /institute */}
        {window.location.pathname.startsWith('/institute') && <InstituteSidebar />}
        
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/features" element={<FeaturesSection />} />
          <Route path="/fee-collection" element={<FeeCollectionSection />} />
          <Route path="/how-it-works" element={<HowItWorksSection />} />
          <Route path="/testimonials" element={<TestimonialsSection />} />
          <Route path="/pricing" element={<PricingSection />} />
          <Route path="/cta" element={<CTASection />} />
          <Route path="/institute-login" element={<InstituteLoginForm />} />
          
          {/* Add institute routes */}
          <Route path="/institute/students" element={<h1>All Students</h1>} />
          <Route path="/institute/instant-pay" element={<h1>Instant Pay</h1>} />
          <Route path="/institute/auto-pay" element={<h1>Auto Pay</h1>} />
          <Route path="/institute/reports" element={<h1>Reports</h1>} />
          <Route path="/institute/transactions" element={<h1>Transaction History</h1>} />
          {/* <Route path="/institute/students" element={<AllStudentPage />} />
          <Route path="/institute/add-student" element={<AddStudentPage />} /> */}

          {/* Redirect to a default page for institute */}
          <Route path="/institute/*" element={<Navigate to="/institute/students" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

