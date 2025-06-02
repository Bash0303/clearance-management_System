import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserShield } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const AdminLogin = () => {
  const [formData, setFormData] = useState({ staffNumber: '', password: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { staffNumber, password } = formData;

    // Ensure both staffNumber and password are provided
    if (!staffNumber || !password) {
      setError('Staff Number and Password are required.');
      setLoading(false);
      return;
    }

    try {
      // Sending form data to backend (make sure the backend expects this format)
      const response = await fetch('http://localhost/atiba-clerance-system/admin/admin_login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ staffNumber, password }),
      });

      const data = await response.json();

      // Handle successful login
      if (data.success) {
        navigate('/admin/dashboard');
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch (err) {
      // Handle error if something goes wrong with the fetch
      setError('Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 px-6">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          <FaUserShield className="inline-block mr-2 text-blue-600" />
          Admin Login
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="staffNumber" className="block text-sm font-medium text-gray-700">Staff Number</label>
              <input
                id="staffNumber"
                name="staffNumber"
                type="text"
                required
                className="w-full mt-1 border rounded px-3 py-2 shadow-sm"
                value={formData.staffNumber}
                onChange={(e) => setFormData({ ...formData, staffNumber: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full mt-1 border rounded px-3 py-2 shadow-sm"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <p className="text-sm mt-4 text-center">
            Don't have an account?{' '}
            <Link to="/admin-register" className="text-blue-600 hover:underline">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
