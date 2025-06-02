// src/api/auth.js
export const verifyAdminToken = async () => {
  const token = localStorage.getItem('adminToken');
  if (!token) return false;

  try {
    const response = await fetch('http://localhost/backend/api/verify-token.php', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return await response.json();
  } catch (error) {
    console.error('Token verification error:', error);
    return { success: false };
  }
};

export const loginAdmin = async (credentials) => {
  try {
    const response = await fetch('http://localhost/backend/api/login.php', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    return await response.json();
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: 'Network error' };
  }
};

export const adminLogout = async () => {
  try {
    await fetch('http://localhost/backend/api/logout.php', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
      }
    });
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
    window.location.href = '/admin-login';
  }
};




export const loginStaff = async (credentials) => {
  try {
    const response = await fetch('http://localhost/backend/api/staff/login.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(credentials)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }

    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const verifyStaffToken = async (token) => {
  try {
    const response = await fetch('http://localhost/backend/api/staff/verify-token.php', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Token verification failed');
    }

    return data;
  } catch (error) {
    console.error('Token verification error:', error);
    throw error;
  }
};

export const staffLogout = async () => {
  const token = localStorage.getItem('staffToken');
  
  try {
    await fetch('http://localhost/backend/api/staff/logout.php', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    localStorage.removeItem('staffToken');
    localStorage.removeItem('staffData');
    window.location.href = '/staff-login';
  }
};