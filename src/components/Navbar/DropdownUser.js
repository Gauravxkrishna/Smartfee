import { useState } from 'react';
import { Link } from 'react-router-dom';
import ClickOutside from './ClickOutside';
// import UserOne from '../../images/user/user-01.png';

const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4 focus:outline-none"
        aria-expanded={dropdownOpen}
        aria-haspopup="true"
      >
        <span className="hidden text-right lg:block">
          <span className="block text-sm font-medium text-black ">
            Thomas Anree
          </span>
          <span className="block text-xs text-gray-500">UX Designer</span>
        </span>

        <span className="h-12 w-12 rounded-full overflow-hidden">
          <img src="https://i.pinimg.com/736x/07/33/ba/0733ba760b29378474dea0fdbcb97107.jpg" alt="User Avatar" width="100" height="100" />
        </span>

        <svg
          className="hidden fill-current sm:block"
          width="12"
          height="8"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.41 0.91a1.2 1.2 0 011.18-.18l4.41 4.41 4.41-4.41a1.2 1.2 0 011.68 1.68L6.59 7.09a1.2 1.2 0 01-1.68 0L0.41 2.09a1.2 1.2 0 010-1.18z"
          />
        </svg>
      </button>

      {dropdownOpen && (
        <div
          className="absolute right-0 mt-4 w-64 rounded border bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800"
          role="menu"
        >
          <ul className="flex flex-col divide-y divide-gray-200 dark:divide-gray-700">
            <li className="px-4 py-3">
              <Link
                to="/profile"
                className="flex items-center gap-3 text-sm font-medium text-gray-700 hover:text-primary dark:text-gray-300"
                role="menuitem"
              >
                <svg className="w-5 h-5" viewBox="0 0 22 22">
                  {/* Your SVG content */}
                </svg>
                My Profile
              </Link>
            </li>
            <li className="px-4 py-3">
              <Link
                to="#"
                className="flex items-center gap-3 text-sm font-medium text-gray-700 hover:text-primary dark:text-gray-300"
                role="menuitem"
              >
                <svg className="w-5 h-5" viewBox="0 0 22 22">
                  {/* Your SVG content */}
                </svg>
                My Contacts
              </Link>
            </li>
            <li className="px-4 py-3">
              <Link
                to="/settings"
                className="flex items-center gap-3 text-sm font-medium text-gray-700 hover:text-primary dark:text-gray-300"
                role="menuitem"
              >
                <svg className="w-5 h-5" viewBox="0 0 22 22">
                  {/* Your SVG content */}
                </svg>
                Settings
              </Link>
            </li>
          </ul>
          <div className="px-4 py-3">
            <button
              onClick={() => alert('Logged out')}
              className="w-full text-left text-sm font-medium text-red-600 hover:text-red-800"
            >
              Log Out
            </button>
          </div>
        </div>
      )}
    </ClickOutside>
  );
};

export default DropdownUser;
