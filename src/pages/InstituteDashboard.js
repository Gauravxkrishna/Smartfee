import React from 'react'
import StudentPage from '../pages/StudentPage'
import InstituteSidebar from '../components/sidebar/InstituteSidebar'
import Navbar from '../components/Navbar/Navbar'

function InstituteDashboard() {
  return (
    <div className="flex h-screen">
      {/* Sidebar with fixed position */}
      <div className="w-64 bg-gray-100 h-full fixed top-0 left-0 z-10">
        <InstituteSidebar />
      </div>

      {/* Main content section that adjusts to the remaining space */}
      <div className="flex flex-col w-full ml-64">
        {/* Navbar placed at the top of the page */}
        <div className="flex justify-between items-center bg-white h-16 w-full mt-0 z-20 pt-2">
          <Navbar />
        </div>

        {/* Main content area that takes the remaining space */}
        <div className="flex-grow bg-white p-6 overflow-y-auto">
          <StudentPage />
        </div>
      </div>
    </div>
  )
}

export default InstituteDashboard;
