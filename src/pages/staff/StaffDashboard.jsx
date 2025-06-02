import { useEffect, useState } from 'react';
import { FiUser, FiMail, FiPhone, FiClock, FiLogIn, FiBook, FiCalendar } from 'react-icons/fi';

const StaffDashboard = () => {
  const [staffData, setStaffData] = useState({
    full_name: '',
    email: '',
    phone: '',
    staff_number: '',
    position: '',
    department_name: '',
    last_login: '',
    profile_image: '',
    course_count: 0
  });

  const [allocations, setAllocations] = useState([]);
  const [loadingAllocations, setLoadingAllocations] = useState(true);

  useEffect(() => {
    // Fetch staff data from API or localStorage
    const data = JSON.parse(localStorage.getItem('staffData')) || {};
    setStaffData({
      full_name: data.full_name || 'Staff Member',
      email: data.email || 'email@kwara.poly.edu.ng',
      phone: data.phone || 'Not provided',
      staff_number: data.staff_number || 'N/A',
      position: data.position || 'Staff',
      department_name: data.department_name || 'Department',
      last_login: data.last_login || new Date().toISOString(),
      profile_image: data.profile_image || 'https://randomuser.me/api/portraits/lego/1.jpg',
      course_count: data.course_count || 0
    });

    // Fetch course allocations
    fetchCourseAllocations(data.id || data.staff_id);
  }, []);

  const fetchCourseAllocations = async (staffId) => {
    try {
      const token = localStorage.getItem('staffToken');
      const response = await fetch(`http://localhost/backend/api/staff/get-staff-data.php?staff_id=${staffId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setAllocations(data.allocations);
      } else {
        console.error('Failed to fetch allocations:', data.message);
      }
    } catch (error) {
      console.error('Error fetching allocations:', error);
    } finally {
      setLoadingAllocations(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Never logged in';
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const formatAllocationDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-gradient-to-r bg-green-900 rounded-xl p-6 text-white shadow-lg">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="relative">
            <img 
              src={staffData.profile_image} 
              alt="Profile" 
              className="w-24 h-24 rounded-full border-4 border-white/20 object-cover shadow-md"
            />
            <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-400 rounded-full border-2 border-white"></div>
          </div>
          
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{staffData.full_name}</h1>
            <p className="text-blue-100">{staffData.position} • {staffData.department_name}</p>
            
            <div className="flex flex-wrap gap-4 mt-4">
              <div className="flex items-center text-sm">
                <FiMail className="mr-2" />
                <span>{staffData.email}</span>
              </div>
              <div className="flex items-center text-sm">
                <FiPhone className="mr-2" />
                <span>{staffData.phone}</span>
              </div>
              <div className="flex items-center text-sm">
                <FiClock className="mr-2" />
                <span>Last login: {formatDate(staffData.last_login)}</span>
              </div>
            </div>
          </div>
          
          <button className="px-4 py-2 text-sm font-medium bg-green-500 hover:bg-white/30 rounded-lg backdrop-blur-sm transition-all flex items-center gap-2">
            <FiUser size={16} />
            Edit Profile
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-gray-500 text-sm font-medium">Courses Assigned</h3>
              <p className="text-3xl font-bold mt-1">{staffData.course_count}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
              <FiBook size={24} />
            </div>
          </div>
          <a href="/staff-dashboard/my-courses" className="mt-4 inline-flex items-center text-sm text-blue-600 hover:text-blue-800">
            View courses <span className="ml-1">→</span>
          </a>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-gray-500 text-sm font-medium">Current Allocations</h3>
              <p className="text-3xl font-bold mt-1">{allocations.length}</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg text-green-600">
              <FiCalendar size={24} />
            </div>
          </div>
          <a href="/staff-dashboard/allocations" className="mt-4 inline-flex items-center text-sm text-blue-600 hover:text-blue-800">
            View allocations <span className="ml-1">→</span>
          </a>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-gray-500 text-sm font-medium">Active Session</h3>
              <p className="text-3xl font-bold mt-1">Online</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg text-purple-600">
              <FiLogIn size={24} />
            </div>
          </div>
          <p className="mt-4 text-sm text-gray-500">Since {formatDate(staffData.last_login)}</p>
        </div>
      </div> */}

      {/* Course Allocations Section */}
      {/* <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Current Course Allocations</h2>
          <button className="text-sm text-blue-600 hover:text-blue-800">View all</button>
        </div>
        
        {loadingAllocations ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : allocations.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Course Code
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Course Title
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Allocated On
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {allocations.map((allocation) => (
                  <tr key={allocation.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {allocation.course_code}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {allocation.course_title || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {allocation.department_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatAllocationDate(allocation.allocated_at)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No course allocations found</p>
          </div>
        )}
      </div> */}

      {/* Recent Activity Section */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Recent Activity</h2>
          <button className="text-sm text-blue-600 hover:text-blue-800">View all</button>
        </div>
        
        <div className="space-y-4">
          {/* <div className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="p-2 bg-blue-50 rounded-lg text-blue-600 mt-1">
              <FiBook size={18} />
            </div>
            <div>
              <p className="font-medium">New course allocation</p>
              <p className="text-sm text-gray-500">CSC 401 - Advanced Programming was assigned to you</p>
              <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
            </div>
          </div> */}
          
          <div className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="p-2 bg-green-50 rounded-lg text-green-600 mt-1">
              <FiLogIn size={18} />
            </div>
            <div>
              <p className="font-medium">Login activity</p>
              <p className="text-sm text-gray-500">You logged in from Chrome on Windows</p>
              <p className="text-xs text-gray-400 mt-1">Today at {new Date().toLocaleTimeString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;