import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaUsers, FaFileAlt, FaUserCog, FaSignOutAlt } from 'react-icons/fa';

const AdminSidebar = ({ sidebarOpen, toggleSidebar }) => {
  const { pathname } = useLocation();

  const navItems = [
    { to: '/admin/dashboard', icon: <FaHome />, label: 'Dashboard' },
    { to: '/admin/dashboard/students', icon: <FaUsers />, label: 'Students' },
    { to: '/admin/dashboard/reviews', icon: <FaFileAlt />, label: 'Review Clearance' },
    { to: '/admin/dashboard/profile', icon: <FaUserCog />, label: 'Profile' },
    { to: '/', icon: <FaSignOutAlt />, label: 'Logout' },
  ];

  return (
    <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-blue-800 text-white transition-all duration-300 h-screen`}>
      <div className="p-4 flex items-center justify-between">
        {sidebarOpen && <h2 className="text-xl font-bold">Admin</h2>}
        <button onClick={toggleSidebar} className="text-white text-lg focus:outline-none">
          {sidebarOpen ? '«' : '»'}
        </button>
      </div>

      <nav className="mt-6 space-y-1">
        {navItems.map((item, index) => (
          <Link
            key={index}
            to={item.to}
            className={`flex items-center p-4 hover:bg-blue-700 transition ${
              pathname === item.to ? 'bg-blue-700' : ''
            }`}
          >
            <span className="mr-3 text-lg">{item.icon}</span>
            {sidebarOpen && <span>{item.label}</span>}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default AdminSidebar;
