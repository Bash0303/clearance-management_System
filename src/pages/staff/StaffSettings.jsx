import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSave, FiEye, FiEyeOff, FiUser, FiMail, FiPhone, FiLock, FiKey } from 'react-icons/fi';

const StaffSettings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [staffData, setStaffData] = useState({
    title: '',
    full_name: '',
    email: '',
    phone: '',
    staff_number: ''
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

  const fetchStaffData = async () => {
    const token = localStorage.getItem('staffToken');

    if (!token) {
      navigate('/staff-login');
      return;
    }

    try {
      const response = await fetch('http://localhost/backend/api/staff/get-staff.php', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        throw new Error(`Server returned non-JSON: ${text.substring(0, 100)}`);
      }

      const data = await response.json();

      if (response.status === 401) {
        localStorage.removeItem('staffToken');
        navigate('/staff-login');
        return;
      }

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to fetch staff data');
      }

      setStaffData({
        title: data.data.title,
        full_name: data.data.full_name,
        email: data.data.email,
        phone: data.data.phone,
        staff_number: data.data.staff_number
      });
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message.includes('non-JSON')
        ? 'Server configuration error - contact administrator'
        : err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaffData();
  }, [navigate]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setStaffData(prev => ({
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

    const token = localStorage.getItem('staffToken');
    if (!token) {
      navigate('/staff-login');
      return;
    }

    try {
      const response = await fetch('http://localhost/backend/api/staff/staff-settings.php', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: staffData.title,
          full_name: staffData.full_name,
          email: staffData.email,
          phone: staffData.phone
        })
      });

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        throw new Error(`Server returned: ${text.substring(0, 100)}`);
      }

      const data = await response.json();

      if (response.status === 401) {
        localStorage.removeItem('staffToken');
        navigate('/staff-login');
        return;
      }

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to update profile');
      }

      setSuccess(data.message);
    } catch (err) {
      console.error('Update error:', err);
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

    const token = localStorage.getItem('staffToken');
    if (!token) {
      navigate('/staff-login');
      return;
    }

    try {
      const response = await fetch('http://localhost/backend/api/staff/staff-settings.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
          confirmPassword: passwordData.confirmPassword
        })
      });

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        throw new Error(`Server returned: ${text.substring(0, 100)}`);
      }

      const data = await response.json();

      if (response.status === 401) {
        localStorage.removeItem('staffToken');
        navigate('/staff-login');
        return;
      }

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to change password');
      }

      setSuccess(data.message);
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (err) {
      console.error('Password change error:', err);
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-green-500 rounded-full border-t-transparent animate-spin"></div>
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
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <select
                  id="title"
                  name="title"
                  value={staffData.title}
                  onChange={handleProfileChange}
                  className="block w-full p-2.5 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                >
                  <option value="">Select Title</option>
                  <option value="Dr.">Dr.</option>
                  <option value="Prof.">Prof.</option>
                  <option value="Mr.">Mr.</option>
                  <option value="Mrs.">Mrs.</option>
                  <option value="Miss">Miss</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="full_name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <FiUser className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="full_name"
                    name="full_name"
                    value={staffData.full_name}
                    onChange={handleProfileChange}
                    className="block w-full pl-10 p-2.5 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
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
                    value={staffData.email}
                    onChange={handleProfileChange}
                    className="block w-full pl-10 p-2.5 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
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
                    value={staffData.phone}
                    onChange={handleProfileChange}
                    className="block w-full pl-10 p-2.5 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                    required
                    pattern="[0-9]{11}"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="staff_number" className="block text-sm font-medium text-gray-700">
                  Staff Number
                </label>
                <input
                  type="text"
                  id="staff_number"
                  name="staff_number"
                  value={staffData.staff_number}
                  className="block w-full p-2.5 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                  readOnly
                  disabled
                />
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="flex items-center px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
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
                    className="block w-full pl-10 pr-10 p-2.5 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
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
                    className="block w-full pl-10 pr-10 p-2.5 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
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
                    className="block w-full pl-10 pr-10 p-2.5 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
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
                className="flex items-center px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
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

export default StaffSettings;