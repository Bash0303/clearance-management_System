import { Outlet } from 'react-router-dom';
import StudentSidebar from './StudentSidebar';

const StudentDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <StudentSidebar />

      {/* Main content area */}
      <div className="flex-1 overflow-auto p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default StudentDashboard;
