import React from 'react'
import StudentPage from '../pages/StudentPage'
import StudentSidebar from '../components/sidebar/StudentSidebar'

function AdminDashboard() {
  return (
    <div className='flex h-screen'>
      {/* Sidebar with fixed width */}
      <div className="w-64 bg-gray-100">
        <StudentSidebar />
      </div>

      {/* Main content area takes remaining space */}
      <div className="flex-grow bg-white p-6 overflow-y-auto">
        <StudentPage />
      </div>
    </div>
  )
}

export default AdminDashboard
