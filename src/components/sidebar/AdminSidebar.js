// src/components/AdminSidebar.js
import { Link } from 'react-router-dom';
import { useState } from 'react';
import  Button  from './Button';
import { Users, CreditCard, Moon, Sun, FileText, Shield, UserPlus, DollarSign, Banknote, Calendar } from 'lucide-react'; // Updated icons

export default function AdminSidebar() {
  const [darkMode, setDarkMode] = useState(false);

  // Toggle dark mode
  const toggleDarkMode = () => setDarkMode(!darkMode);

  // Define dashboard routes
  const dashboardItems = [
    { href: '/institute', label: 'Institute', icon: Users }, // Users icon for institute
    { href: '/transaction', label: 'Transaction', icon: DollarSign }, // Dollar sign for payments
    { href: '/settlements', label: 'Settlements', icon: FileText }, // File text for settlements
    { href: '/reports', label: 'Reports', icon: FileText }, // File text for reports
    { href: '/bulk-action', label: 'Bulk-Action', icon: Shield }, // Shield for block-action
  ];
  // Define payment-related routes
  const paymentItems = [
    { href: '/flex', label: 'Flex', icon: Banknote }, // Banknote icon for Flex
    // { href: '/offline-payment', label: 'Offline Payment', icon: CreditCard }, // CreditCard icon for Cred
    { href: '/auto-pay', label: 'Autopay', icon: Calendar }, // Calendar icon for Autopay (for scheduled payments)
  ];

  // Define user management routes
  const manageUsersItems = [
    { href: '/admin-hr', label: 'Admin-Hr', icon: UserPlus }, // UserPlus for Admin-Hr
  ];

  return (
    <div
      className={`w-64 h-screen flex flex-col transition-colors duration-300 ${
        darkMode ? 'bg-gray-900 text-white' : 'bg-blue-900 text-gray-900'
      }`}
    >
      <div className="p-4 space-y-2 flex-grow">
        {/* Dashboard Section */}
        <h3 className={`text-sm ms-2 font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-400'}`}>
          Dashboard
        </h3>
        {dashboardItems.map((item) => (
          <Button
            key={item.href}
            variant="ghost"
            className={`w-full justify-start rounded-md px-6 py-2 transition-colors duration-200 group ${
              darkMode
                ? 'bg-gray-800 text-white hover:bg-gray-700'
                : 'bg-blue-800 text-white hover:bg-white hover:text-blue-900'
            }`}
          >
            <Link to={item.href} className="flex items-center w-full">
              <item.icon
                className={`w-5 h-5 mr-3 transition-colors duration-200 group-hover:text-blue-900 ${
                  darkMode ? 'text-gray-300' : 'text-white'
                }`} // Correct hover class for icons
              />
              <span className="text-base font-medium">{item.label}</span>
            </Link>
          </Button>
        ))}

        {/* Payments Section */}
        <h3 className={`text-sm font-semibold mt-5 ms-2 pt-5 ${darkMode ? 'text-gray-300' : 'text-gray-400'}`}>
          Pay Methods
        </h3>
        {paymentItems.map((item) => (
          <Button
            key={item.href}
            variant="ghost"
            className={`w-full justify-start rounded-md px-6 py-2 transition-colors duration-200 group ${
              darkMode
                ? 'bg-gray-800 text-white hover:bg-gray-700'
                : 'bg-blue-800 text-white hover:bg-white hover:text-blue-900'
            }`}
          >
            <Link to={item.href} className="flex items-center w-full">
              <item.icon
                className={`w-5 h-5 mr-3 transition-colors duration-200 group-hover:text-blue-900 ${
                  darkMode ? 'text-gray-300' : 'text-white'
                }`} // Correct hover class for icons
              />
              <span className="text-base font-medium">{item.label}</span>
            </Link>
          </Button>
        ))}
      </div>

      {/* Dark Mode Toggle */}
      <div className="p-4">
        <Button
          onClick={toggleDarkMode}
          className="w-full ms-2 text-gray-300 justify-start rounded-lg py-3 transition-colors duration-200 flex items-center space-x-2"
        >
          {darkMode ? (
            <>
              <Sun className="w-6 h-6" />
              <span>Light Mode</span>
            </>
          ) : (
            <>
              <Moon className="w-6 h-6" />
              <span>Dark Mode</span>
            </>
          )}
        </Button>
        <hr className={` ${darkMode ? 'border-gray-700' : 'border-blue-200'}`} />

        {/* Manage Users Section */}
        <h3 className={`text-sm font-semibold ms-2 mt-2 mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-400'}`}>
          Manage Users
        </h3>
        {manageUsersItems.map((item) => (
          <Button
            key={item.href}
            variant="ghost"
            className={`w-full justify-start rounded-md px-6 py-2 transition-colors duration-200 group ${
              darkMode
                ? 'bg-gray-800 text-white hover:bg-gray-700'
                : 'bg-blue-800 text-white hover:bg-white hover:text-blue-900'
            }`}
          >
            <Link to={item.href} className="flex items-center w-full">
              <item.icon
                className={`w-5 h-5 mr-3 transition-colors duration-200 group-hover:text-blue-900 ${
                  darkMode ? 'text-gray-300' : 'text-white'
                }`} // Correct hover class for icons
              />
              <span className="text-base font-medium">{item.label}</span>
            </Link>
          </Button>
        ))}
      </div>
    </div>
  );
}
