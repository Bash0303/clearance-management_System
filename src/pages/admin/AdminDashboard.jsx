// import { FiUsers, FiBook, FiLayers, FiClock, FiBarChart2, FiDownload, FiSettings, FiCalendar } from 'react-icons/fi';
// import React, { useState, useEffect } from 'react';

// const AdminDashboard = () => {
//   const [adminData, setAdminData] = useState({
//     full_name: 'Admin User',
//     email: 'admin@kwara.poly.edu.ng',
//     last_login: new Date().toISOString(),
//     stats: {
//       total_staff: 0,
//       active_courses: 0,
//       pending_allocations: 0,
//       recent_activity: []
//     }
//   });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         const token = localStorage.getItem('adminToken');
//         const response = await fetch('http://localhost/backend/api/dashboard-data.php', {
//           method: 'GET',
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json'
//           }
//         });

//         if (!response.ok) {
//           throw new Error('Failed to fetch dashboard data');
//         }

//         const data = await response.json();
//         if (data.success) {
//           setAdminData(data.data);
//         }
//       } catch (error) {
//         console.error('Error fetching dashboard data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDashboardData();
//   }, []);

//   const formatDate = (dateString) => {
//     if (!dateString) return 'Never logged in';
//     const date = new Date(dateString);
//     return date.toLocaleString();
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//         <span className="ml-2">Loading dashboard...</span>
//       </div>
//     );
//   }


import React, { useState, useEffect } from 'react';
import { FiUsers, FiBook, FiLayers, FiBarChart2, FiSettings } from 'react-icons/fi';

const AdminDashboard = () => {
  const [adminData, setAdminData] = useState(null);

  const fetchData = async () => {
    try {
      const res = await fetch('http://localhost/backend/api/dashboard-data.php', {
        headers: {
          'Content-Type': 'application/json',
          // Remove this or replace with actual token if needed:
          // Authorization: `Bearer ${yourToken}` 
        }
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`HTTP error ${res.status}: ${text}`);
      }

      const data = await res.json();
      console.log('Fetched dashboard data:', data);
      setAdminData(data); // ← This was missing
    } catch (error) {
      console.error('Failed to fetch admin dashboard data:', error);
    }
  };

  useEffect(() => {
    fetchData(); // ← This was missing
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return 'Never logged in';
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  if (!adminData) {
    return <div className="text-center py-10">Loading dashboard...</div>;
  }


  return (
    <div className="space-y-6">
      {/* Header with Quick Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
          <p className="text-gray-500">Last login: {formatDate(adminData.last_login)}</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Staff Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Total Staff</p>
              <h3 className="text-3xl font-bold mt-1">{adminData.stats.total_staff}</h3>
            </div>
            <div className="p-3 bg-indigo-50 rounded-lg text-indigo-600">
              <FiUsers size={24} />
            </div>
          </div>
          <a href="/admin-dashboard/staff-management" className="mt-4 inline-flex items-center text-sm text-blue-600 hover:text-blue-800">
            Manage staff <span className="ml-1">→</span>
          </a>
        </div>

        {/* Courses Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Active Courses</p>
              <h3 className="text-3xl font-bold mt-1">{adminData.stats.active_courses}</h3>
            </div>
            <div className="p-3 bg-green-50 rounded-lg text-green-600">
              <FiBook size={24} />
            </div>
          </div>
          <a href="/admin-dashboard/courses" className="mt-4 inline-flex items-center text-sm text-blue-600 hover:text-blue-800">
            View courses <span className="ml-1">→</span>
          </a>
        </div>

        {/* Allocations Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium"> Allocated Courses </p>
              <h3 className="text-3xl font-bold mt-1">{adminData.stats.pending_allocations}</h3>
            </div>
            <div className="p-3 bg-amber-50 rounded-lg text-amber-600">
              <FiLayers size={24} />
            </div>
          </div>
          <a href="/admin-dashboard/course-allocation" className="mt-4 inline-flex items-center text-sm text-blue-600 hover:text-blue-800">
            Review allocations <span className="ml-1">→</span>
          </a>
        </div>

        {/* System Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">System Status</p>
              <h3 className="text-3xl font-bold mt-1">Active</h3>
            </div>
            <div className="p-3 bg-emerald-50 rounded-lg text-emerald-600">
              <FiBarChart2 size={24} />
            </div>
          </div>
          <a href="/admin-dashboard/settings" className="mt-4 inline-flex items-center text-sm text-blue-600 hover:text-blue-800">
            System settings <span className="ml-1">→</span>
          </a>
        </div>
      </div>

      {/* Recent Activity and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Recent Activity</h2>
            <button className="text-sm text-blue-600 hover:text-blue-800">View all</button>
          </div>
          
          <div className="space-y-4">
            {adminData.stats.recent_activity.map(activity => (
              <div key={activity.id} className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className={`p-2 rounded-lg mt-1 ${
                  activity.type === 'allocation' ? 'bg-blue-50 text-blue-600' : 
                  activity.type === 'staff' ? 'bg-purple-50 text-purple-600' : 'bg-gray-50 text-gray-600'
                }`}>
                  {activity.type === 'allocation' ? <FiLayers size={18} /> : <FiUsers size={18} />}
                </div>
                <div>
                  <p className="font-medium">{activity.message}</p>
                  <p className="text-xs text-gray-400 mt-1">{formatDate(activity.time)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <a href="/admin-dashboard/create-course" className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="p-2 bg-green-50 rounded-lg text-green-600">
                <FiBook size={18} />
              </div>
              <span>Create New Course</span>
            </a>
            <a href="/admin-dashboard/course-allocation" className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                <FiLayers size={18} />
              </div>
              <span>Allocate Courses</span>
            </a>
            <a href="/admin-dashboard/settings" className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="p-2 bg-gray-50 rounded-lg text-gray-600">
                <FiSettings size={18} />
              </div>
              <span>System Settings</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;