import React from 'react'
import ReportDashboard from '../pages/Report/ReportDashboard'
import AdminSidebar from '../components/sidebar/AdminSidebar'

function AdminDashboard() {
  return (
    <div className='flex h-screen'>
      {/* Sidebar with fixed width */}
      <div className="w-64 bg-gray-100">
        <AdminSidebar />
      </div>

      {/* Main content area takes remaining space */}
      <div className="flex-grow bg-white p-6 overflow-y-auto">
        <ReportDashboard />
      </div>
    </div>
  )
}

export default AdminDashboard