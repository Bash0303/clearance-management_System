import { useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';

const AdminProfile = () => {
  const [admin, setAdmin] = useState({
    full_name: '',
    staff_number: '',
    phone_number: '',
    title: '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [updatedAdmin, setUpdatedAdmin] = useState(admin);

  useEffect(() => {
    const storedAdmin = JSON.parse(localStorage.getItem('adminData'));
    if (storedAdmin) {
      setAdmin(storedAdmin);
      setUpdatedAdmin(storedAdmin);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedAdmin((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    localStorage.setItem('adminData', JSON.stringify(updatedAdmin));
    setAdmin(updatedAdmin);
    setIsEditing(false);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-8">
        <div className="flex items-center space-x-4">
          <FaUserCircle className="text-blue-600 text-5xl" />
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Admin Profile</h1>
            <p className="text-sm text-gray-500">
              Welcome, {admin.title} {admin.full_name}
            </p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium text-gray-600">Full Name</label>
            {isEditing ? (
              <input
                type="text"
                name="full_name"
                value={updatedAdmin.full_name}
                onChange={handleChange}
                className="mt-1 text-lg text-gray-900 border-2 border-gray-300 p-2 rounded"
              />
            ) : (
              <p className="mt-1 text-lg text-gray-900">{admin.full_name}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">Staff Number</label>
            {isEditing ? (
              <input
                type="text"
                name="staff_number"
                value={updatedAdmin.staff_number}
                onChange={handleChange}
                className="mt-1 text-lg text-gray-900 border-2 border-gray-300 p-2 rounded"
              />
            ) : (
              <p className="mt-1 text-lg text-gray-900">{admin.staff_number}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">Phone Number</label>
            {isEditing ? (
              <input
                type="text"
                name="phone_number"
                value={updatedAdmin.phone_number}
                onChange={handleChange}
                className="mt-1 text-lg text-gray-900 border-2 border-gray-300 p-2 rounded"
              />
            ) : (
              <p className="mt-1 text-lg text-gray-900">{admin.phone_number}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">Title</label>
            {isEditing ? (
              <input
                type="text"
                name="title"
                value={updatedAdmin.title}
                onChange={handleChange}
                className="mt-1 text-lg text-gray-900 border-2 border-gray-300 p-2 rounded"
              />
            ) : (
              <p className="mt-1 text-lg text-gray-900">{admin.title}</p>
            )}
          </div>
        </div>

        <div className="mt-6 flex space-x-4">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Save Changes
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-yellow-500 text-white px-4 py-2 rounded"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;

