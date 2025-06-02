import { Link } from 'react-router-dom';
import { FaUser, FaUpload, FaFileAlt, FaSignOutAlt } from 'react-icons/fa';

const StudentSidebar = () => {
  return (
    <div className="w-64 bg-blue-800 text-white min-h-screen p-4">
      <h2 className="text-xl font-bold mb-6">Student Dashboard</h2>

      <nav>
        <Link to="/student/dashboard/profile" className="flex items-center p-3 hover:bg-blue-700 rounded">
          <FaUser className="mr-2" />
          Profile
        </Link>
        <Link to="/student/dashboard/status" className="flex items-center p-3 hover:bg-blue-700 rounded">
          <FaFileAlt className="mr-2" />
          Clearance Status
        </Link>
        <Link to="/student/dashboard/upload" className="flex items-center p-3 hover:bg-blue-700 rounded">
          <FaUpload className="mr-2" />
          Upload Document
        </Link>
        <Link to="/" className="flex items-center p-3 hover:bg-blue-700 rounded mt-8">
          <FaSignOutAlt className="mr-2" />
          Logout
        </Link>
      </nav>
    </div>
  );
};

export default StudentSidebar;
