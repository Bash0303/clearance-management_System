import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSave, FiEye, FiEyeOff, FiUser, FiMail, FiPhone, FiLock } from 'react-icons/fi';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [adminData, setAdminData] = useState({
    fullName: '',
    email: '',
    phone: '',
    staffId: ''
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchAdminData();
  }, [navigate]);

  // const fetchAdminData = async () => {
  //   try {
  //     const token = localStorage.getItem('adminToken');
  //     if (!token) {
  //       navigate('/admin-login');
  //       return;
  //     }

  //     const response = await fetch('http://localhost/backend/api/get_admin_profile.php', {
  //       method: 'GET',
  //       headers: {
  //         'Authorization': `Bearer ${token}`,
  //         'Content-Type': 'application/json'
  //       },
  //       credentials: 'include'
  //     });

  //     if (!response.ok) {
  //       throw new Error('Failed to fetch admin data');
  //     }

  //     const data = await response.json();
  //     setAdminData({
  //       fullName: data.fullName,
  //       email: data.email,
  //       phone: data.phone,
  //       staffId: data.staffId
  //     });
  //   } catch (err) {
  //     setError(err.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

const fetchAdminData = async () => {
  try {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin-login');
      return;
    }

    const response = await fetch('http://localhost/backend/api/get_admin_profile.php', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch admin data');
    }

    // Check if data.admin exists before accessing its properties
    if (!data.admin) {
      throw new Error('Admin data not found in response');
    }

    setAdminData({
      fullName: data.admin.full_name || '',
      email: data.admin.email || '',
      phone: data.admin.phone || '',
      staffId: data.admin.staff_id || ''
    });
  } catch (err) {
    console.error('Error fetching admin data:', err);
    setError(err.message);
    
    // If unauthorized, clear storage and redirect
    if (err.message.includes('401') || err.message.includes('Unauthorized')) {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminData');
      navigate('/admin-login');
    }
  } finally {
    setLoading(false);
  }
};

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setAdminData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        navigate('/admin-login');
        return;
      }

      const response = await fetch('http://localhost/backend/api/update_admin_profile.php', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(adminData),
        credentials: 'include'
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update profile');
      }

      setSuccess(data.message);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        navigate('/admin-login');
        return;
      }

      const response = await fetch('http://localhost/backend/api/update_admin_password.php', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        }),
        credentials: 'include'
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update password');
      }

      setSuccess(data.message);
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Account Settings</h2>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex -mb-px space-x-8">
          <button
            onClick={() => setActiveTab('profile')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'profile' ? 'border-green-500 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
          >
            Profile Information
          </button>
          <button
            onClick={() => setActiveTab('password')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'password' ? 'border-green-500 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
          >
            Change Password
          </button>
        </nav>
      </div>

      {error && (
        <div className="p-4 text-red-700 bg-red-100 rounded-lg">
          {error}
        </div>
      )}

      {success && (
        <div className="p-4 text-green-700 bg-green-100 rounded-lg">
          {success}
        </div>
      )}

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className="p-6 bg-white rounded-lg shadow">
          <form onSubmit={handleProfileSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <FiUser className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={adminData.fullName}
                    onChange={handleProfileChange}
                    className="block w-full pl-10 p-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <FiMail className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={adminData.email}
                    onChange={handleProfileChange}
                    className="block w-full pl-10 p-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <FiPhone className="text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={adminData.phone}
                    onChange={handleProfileChange}
                    className="block w-full pl-10 p-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    required
                    pattern="[0-9]{11}"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="staffId" className="block text-sm font-medium text-gray-700">
                  Staff ID
                </label>
                <input
                  type="text"
                  id="staffId"
                  name="staffId"
                  value={adminData.staffId}
                  className="block w-full p-2.5 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                  readOnly
                  disabled
                />
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="flex items-center px-4 py-2 text-white bg-green-900 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <FiSave className="w-4 h-4 mr-2" />
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Password Tab */}
      {activeTab === 'password' && (
        <div className="p-6 bg-white rounded-lg shadow">
          <form onSubmit={handlePasswordSubmit} className="space-y-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                  Current Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <FiLock className="text-gray-400" />
                  </div>
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    id="currentPassword"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    className="block w-full pl-10 pr-10 p-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? <FiEyeOff className="text-gray-400" /> : <FiEye className="text-gray-400" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <FiLock className="text-gray-400" />
                  </div>
                  <input
                    type={showNewPassword ? "text" : "password"}
                    id="newPassword"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    className="block w-full pl-10 pr-10 p-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    required
                    minLength="8"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? <FiEyeOff className="text-gray-400" /> : <FiEye className="text-gray-400" />}
                  </button>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Password must be at least 8 characters long
                </p>
              </div>

              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <FiLock className="text-gray-400" />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    className="block w-full pl-10 pr-10 p-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <FiEyeOff className="text-gray-400" /> : <FiEye className="text-gray-400" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="flex items-center px-4 py-2 text-white bg-green-900 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <FiSave className="w-4 h-4 mr-2" />
                Change Password
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Settings;