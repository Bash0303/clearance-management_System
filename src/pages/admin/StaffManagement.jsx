import { useEffect, useState } from 'react';
import { FiUserPlus, FiSearch, FiEdit2, FiTrash2 } from 'react-icons/fi';
import Button from '../../components/admindashboardcomponents/Button';
import Table from '../../components/admindashboardcomponents/Table';
import axios from 'axios';

const StaffManagement = () => {
  const [staffMembers, setStaffMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingStaff, setEditingStaff] = useState(null);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    department_name: '',
  });

  // Fetch staff
  useEffect(() => {
    axios.get('http://localhost/backend/api/get_staff.php')
      .then(res => {
        if (res.data.success) setStaffMembers(res.data.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  // Delete
  const deleteStaff = (id) => {
    if (window.confirm('Delete this staff?')) {
      axios.post('http://localhost/backend/api/delete_staff.php', { id })
        .then(res => {
          if (res.data.success) {
            setStaffMembers(prev => prev.filter(staff => staff.id !== id));
            alert('Deleted!');
          } else {
            alert('Delete failed');
          }
        });
    }
  };

 
  // Table data
  const columns = [
    { header: 'Name', accessor: 'full_name' },
    { header: 'Email', accessor: 'email' },
    { header: 'Department', accessor: 'department_name' }
  ];

  const data = staffMembers.map(staff => ({
    ...staff,
  }));

  return (
    <div className="space-y-6">
      <div className="p-4">
        <div className="flex justify-between mb-4">
          <div className="relative w-64">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FiSearch className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search staff..."
              className="w-full py-2 pl-10 pr-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <Table columns={columns} data={data} />
      </div>

    </div>
  );
};

export default StaffManagement;
