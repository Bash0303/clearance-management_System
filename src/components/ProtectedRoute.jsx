import { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import Spinner from './admindashboardcomponents/Spinner';

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        if (!token) {
          navigate('/admin-login', { replace: true });
          return;
        }

        const response = await fetch('http://localhost/backend/api/verify-token.php', {
          method: 'GET',
          credentials: 'include',
          headers: { 'Authorization': `Bearer ${token}` }
        });

        const data = await response.json();
        
        if (!response.ok || data.success !== true) {
          throw new Error(data.error || 'Token verification failed');
        }

        setIsAuthenticated(true);
      } catch (error) {
        console.error('Auth verification error:', error);
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminData');
        navigate('/admin-login', { replace: true });
      } finally {
        setLoading(false);
      }
    };

    verifyAuth();
  }, [navigate, location.pathname]);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size="lg" />
        <span className="ml-2">Verifying authentication...</span>
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/admin-login" state={{ from: location }} replace />;
};

export default ProtectedRoute;