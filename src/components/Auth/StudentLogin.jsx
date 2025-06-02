import { useState } from 'react';
import { FaUserGraduate, FaLock } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const StudentLogin = () => {
  const [formData, setFormData] = useState({
    matricNumber: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost/atiba-clerance-system/student/student_login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.status === 'success') {
        // Save the full student object
        localStorage.setItem('student', JSON.stringify(data.student));
        // Also save matric_number separately for easy retrieval
        localStorage.setItem('matric_number', data.student.matric_number.trim());

        setSuccess('Login successful! Redirecting...');
        setTimeout(() => navigate('/student/dashboard'), 1000);
      } else {
        setError(data.message || 'Invalid matric number or password');
      }
    } catch (err) {
      setError('Unable to connect to the server. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            <FaUserGraduate className="inline-block mr-2 text-blue-600" />
            Student Login
          </h2>
        </div>

        <div className="bg-white rounded-lg shadow px-6 py-8">
          {error && (
            <div className="mb-4 text-sm text-center text-red-600 bg-red-100 px-4 py-2 rounded">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 text-sm text-center text-green-700 bg-green-100 px-4 py-2 rounded">
              {success}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Matric Number */}
            <div>
              <label htmlFor="matricNumber" className="block text-sm font-medium text-gray-700">
                Matric Number
              </label>
              <div className="mt-1 relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <FaUserGraduate className="h-5 w-5 text-gray-400" />
                </span>
                <input
                  type="text"
                  id="matricNumber"
                  name="matricNumber"
                  value={formData.matricNumber}
                  onChange={handleChange}
                  required
                  autoComplete="username"
                  className="pl-10 py-2 w-full border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <FaLock className="h-5 w-5 text-gray-400" />
                </span>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  autoComplete="current-password"
                  className="pl-10 py-2 w-full border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 px-4 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </div>
          </form>

          {/* Registration Link */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/student-register" className="text-blue-600 hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;
