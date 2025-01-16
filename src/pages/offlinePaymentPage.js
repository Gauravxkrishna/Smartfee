import React from 'react'
import ReportDashboard from './Report/ReportDashboard'
import InstituteSidebar from '../components/sidebar/InstituteSidebar'
import OfflinePayments from '../components/offlinePayment/OfflinePayments'

function AdminDashboard() {
  return (
    <div className='flex h-screen'>
      {/* Sidebar with fixed width */}
      <div className="w-64 bg-gray-100">
        <InstituteSidebar />
      </div>

      {/* Main content area takes remaining space */}
      <div className="flex-grow bg-white p-6 overflow-y-auto">
        <OfflinePayments />
      </div>
    </div>
  )
}

export default AdminDashboard
