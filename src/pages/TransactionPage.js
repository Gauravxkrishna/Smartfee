import React from 'react'
import StudentPage from '../pages/StudentPage'
import InstituteSidebar from '../components/sidebar/InstituteSidebar'
import Navbar from '../components/Navbar/Navbar'
import Transaction from '../components/transaction/transaction'

function InstituteDashboard() {
  return (
    <div className="flex h-screen">
      {/* Sidebar with fixed position */}
      <div className="w-64 bg-gray-100 h-full fixed top-0 left-0 z-10">
        <InstituteSidebar />
      </div>

      {/* Main content section that adjusts to the remaining space */}
      <div className="flex flex-col w-full ml-64">
    

        {/* Main content area that takes the remaining space */}
        <div className="flex-grow bg-white p-6 overflow-y-auto">
          <Transaction/>
        </div>
      </div>
    </div>
  )
}

export default InstituteDashboard;
