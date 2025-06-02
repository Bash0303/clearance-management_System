
import { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import Spinner from './staffdashboardcomponents/Spinner';

const StaffProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const token = localStorage.getItem('staffToken');
        if (!token) {
          throw new Error('No authentication token found');
        }

        const response = await fetch('http://localhost/backend/api/staff/verify-token.php', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.message || 'Token verification failed');
        }

        setIsAuthenticated(true);
      } catch (error) {
        console.error('Authentication error:', error.message);
        localStorage.removeItem('staffToken');
        localStorage.removeItem('staffData');
        navigate('/staff-login', {
          replace: true,
          state: {
            from: location,
            error: error.message
          }
        });
      } finally {
        setLoading(false);
      }
    };

    verifyAuth();
  }, [navigate, location]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size="lg" />
        <span className="ml-2">Verifying authentication...</span>
      </div>
    );
  }

  return isAuthenticated ? children : null;
};

export default StaffProtectedRoute;