import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSave, FiEye, FiEyeOff, FiUser, FiMail, FiPhone, FiLock } from 'react-icons/fi';
import Card from '../../components/admindashboardcomponents/Card';
import Button from '../../components/admindashboardcomponents/Button';
// import Spinner from '../../components/staffdashboardcomponents/Spinner';

const StaffProfile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [profile, setProfile] = useState({
    title: '',
    full_name: '',
    email: '',
    phone: '',
    staff_number: '',
    position: '',
    department_name: ''
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
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('staffToken');
        if (!token) {
          throw new Error('No authentication token found');
        }

        const response = await fetch('http://localhost/backend/api/staff/get_staff_profile.php', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch profile: ${response.statusText}`);
        }

        const data = await response.json();
        setProfile(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching profile:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('staffToken');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const updateData = {
        full_name: profile.full_name,
        email: profile.email,
        phone: profile.phone
      };

      const response = await fetch('http://localhost/backend/api/staff/update_staff_profile.php', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData),
        credentials: 'include'
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update profile');
      }

      setProfile(data.staff || profile);
      setSuccess(data.message);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message);
      console.error('Error updating profile:', err);
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
      const token = localStorage.getItem('staffToken');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch('http://localhost/backend/api/staff/update_staff_password.php', {
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
      console.error('Error updating password:', err);
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
        <h2 className="text-2xl font-bold text-gray-800">Staff Profile</h2>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex -mb-px space-x-8">
          <button
            onClick={() => setActiveTab('profile')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'profile' ? 'border-green-500 text-green-900' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
          >
            Profile Information
          </button>
          <button
            onClick={() => setActiveTab('password')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'password' ? 'border-green-500 text-green-900' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
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
        <Card>
          <div className="p-6">
            <form onSubmit={handleProfileSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Title
                  </label>
                  <input
                    type="text"
                    value={profile.title || ''}
                    readOnly
                    className="block w-full p-2.5 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <FiUser className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="full_name"
                      value={profile.full_name || ''}
                      onChange={handleProfileChange}
                      className="block w-full pl-10 p-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <FiMail className="text-gray-400" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={profile.email || ''}
                      onChange={handleProfileChange}
                      className="block w-full pl-10 p-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <FiPhone className="text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      value={profile.phone || ''}
                      onChange={handleProfileChange}
                      className="block w-full pl-10 p-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      required
                      pattern="[0-9]{11}"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Staff Number
                  </label>
                  <input
                    type="text"
                    value={profile.staff_number || ''}
                    readOnly
                    className="block w-full p-2.5 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Position
                  </label>
                  <input
                    type="text"
                    value={profile.position || ''}
                    readOnly
                    className="block w-full p-2.5 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Department
                  </label>
                  <input
                    type="text"
                    value={profile.department_name || ''}
                    readOnly
                    className="block w-full p-2.5 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button
                  type="submit"
                  variant="primary"
                  className="flex items-center px-4 py-2 text-white bg-green-900 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <FiSave className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </form>
          </div>
        </Card>
      )}

      {/* Password Tab */}
      {activeTab === 'password' && (
        <Card>
          <div className="p-6">
            <form onSubmit={handlePasswordSubmit} className="space-y-6">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Current Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <FiLock className="text-gray-400" />
                    </div>
                    <input
                      type={showCurrentPassword ? "text" : "password"}
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
                  <label className="block text-sm font-medium text-gray-700">
                    New Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <FiLock className="text-gray-400" />
                    </div>
                    <input
                      type={showNewPassword ? "text" : "password"}
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
                  <label className="block text-sm font-medium text-gray-700">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <FiLock className="text-gray-400" />
                    </div>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
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
                <Button
                  type="submit"
                  variant="primary"
                  className="flex items-center px-4 py-2 text-white bg-green-900 rounded-lg hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <FiSave className="w-4 h-4 mr-2" />
                  Change Password
                </Button>
              </div>
            </form>
          </div>
        </Card>
      )}
    </div>
  );
};

export default StaffProfile;