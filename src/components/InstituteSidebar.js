import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserFriends,
  faFileInvoiceDollar,
  faClipboardList,
  faFileAlt,
  faHistory,
} from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';

const InstituteSidebar = () => {
  const location = useLocation();

  // Define sidebar sections for the institute
  const sections = [
    { name: 'All Students', path: '/institute/students', icon: faUserFriends },
    { name: 'Instant Pay', path: '/institute/instant-pay', icon: faFileInvoiceDollar },
    { name: 'Auto Pay', path: '/institute/auto-pay', icon: faClipboardList },
    { name: 'Reports', path: '/institute/reports', icon: faFileAlt },
    { name: 'Transaction History', path: '/institute/transactions', icon: faHistory },
  ];

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Institute Navigation</h2>
      <ul className="sidebar-list">
        {sections.map((section, index) => (
          <li key={index} className="sidebar-item">
            <Link to={section.path} className={`sidebar-link ${location.pathname === section.path ? 'active' : ''}`}>
              <FontAwesomeIcon icon={section.icon} className="sidebar-icon" />
              {section.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InstituteSidebar;
