import React from 'react'
import ReportDashboard from '../pages/Report/ReportDashboard'
import InstituteSidebar from '../components/sidebar/InstituteSidebar'

function AdminDashboard() {
  return (
    <div className='flex h-screen'>
      {/* Sidebar with fixed width */}
      <div className="w-64 bg-gray-100">
        <InstituteSidebar />
      </div>

      {/* Main content area takes remaining space */}
      <div className="flex-grow bg-white p-6 overflow-y-auto">
        <ReportDashboard />
      </div>
    </div>
  )
}

export default AdminDashboard
