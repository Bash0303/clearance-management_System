import { useEffect, useState } from 'react';
import Card from '../../components/admindashboardcomponents/Card';
import Button from '../../components/admindashboardcomponents/Button';
import Table from '../../components/admindashboardcomponents/Table';

const CourseAllocation = () => {
  const [dropdownData, setDropdownData] = useState({
    courses: [],
    staff: [],
    departments: [],
  });

  const [formData, setFormData] = useState({
    id: null, // For edit mode
    course_code: '',
    staff_id: '',
    department_name: '',
  });

  const [message, setMessage] = useState('');
  const [allocations, setAllocations] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchData();
    fetchAllocations();
  }, []);

  const fetchData = () => {
    fetch('http://localhost/backend/api/get_dropdown_data.php')
      .then((res) => res.json())
      .then((data) => setDropdownData(data))
      .catch((err) => console.error('Failed to fetch data:', err));
  };

  const fetchAllocations = () => {
    fetch('http://localhost/backend/api/get_allocations.php')
      .then((res) => res.json())
      .then((data) => setAllocations(data))
      .catch((err) => console.error('Failed to fetch allocations:', err));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!formData.course_code || !formData.staff_id || !formData.department_name) {
      setMessage('Please select all fields.');
      return;
    }

    try {
      const url = isEditing 
        ? 'http://localhost/backend/api/update_allocation.php'
        : 'http://localhost/backend/api/allocate_course.php';
      
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      setMessage(result.message);
      if (result.status === 'success') {
        fetchAllocations();
        resetForm();
      }
    } catch (error) {
      console.error('Error submitting allocation:', error);
      setMessage('Submission failed.');
    }
  };

  const handleEdit = (allocation) => {
    setFormData({
      id: allocation.id,
      course_code: allocation.course_code,
      staff_id: allocation.staff_id,
      department_name: allocation.department_name,
    });
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this allocation?')) {
      return;
    }

    try {
      const res = await fetch(`http://localhost/backend/api/delete_allocation.php?id=${id}`, {
        method: 'DELETE',
      });

      const result = await res.json();
      setMessage(result.message);
      if (result.status === 'success') {
        fetchAllocations();
      }
    } catch (error) {
      console.error('Error deleting allocation:', error);
      setMessage('Delete failed.');
    }
  };

  const resetForm = () => {
    setFormData({
      id: null,
      course_code: '',
      staff_id: '',
      department_name: '',
    });
    setIsEditing(false);
  };

  // Table columns configuration with actions
 const columns = [
  { header: 'Course Code', accessor: 'course_code' },
  { header: 'Staff Name', accessor: 'staff_name' },
  { header: 'Department', accessor: 'department_name' },
  { header: 'Allocated At', accessor: 'allocated_at' },
  {
    header: 'Actions',
    accessor: 'id',
    render: (id, row) => (
      <div className="flex space-x-2">
        <button
          onClick={() => handleEdit(row)}
          className="px-3 py-1 text-sm text-white bg-green-900 rounded hover:bg-green-700"
        >
          Edit
        </button>
        <button
          onClick={() => handleDelete(id)}
          className="px-3 py-1 text-sm text-white bg-red-600 rounded hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    ),
  },
];

  return (
    <div className="space-y-6">
      <Card>
        <div className="p-4 space-y-4">
          <h2 className="text-xl font-semibold">
            {isEditing ? 'Edit Allocation' : 'Create New Allocation'}
          </h2>
          
          {/* Dropdowns */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <select
              name="course_code"
              value={formData.course_code}
              onChange={handleChange}
              className="px-3 py-2 border rounded"
            >
              <option value="">Select Course</option>
              {dropdownData.courses.map((course) => (
                <option key={course.id} value={course.course_code}>
                  {course.course_code} - {course.course_title}
                </option>
              ))}
            </select>

            <select
              name="staff_id"
              value={formData.staff_id}
              onChange={handleChange}
              className="px-3 py-2 border rounded"
            >
              <option value="">Select Staff</option>
              {dropdownData.staff.map((staff) => (
                <option key={staff.id} value={staff.id}>
                  {staff.full_name}
                </option>
              ))}
            </select>

            <select
              name="department_name"
              value={formData.department_name}
              onChange={handleChange}
              className="px-3 py-2 border rounded"
            >
              <option value="">Select Department</option>
              {dropdownData.departments.map((dept) => (
                <option key={dept.id} value={dept.name}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <Button variant="generalBg" onClick={handleSubmit}>
              {isEditing ? 'Update' : 'Allocate'}
            </Button>
            {isEditing && (
              <Button variant="generalCancle" onClick={resetForm}>
                Cancel
              </Button>
            )}
          </div>
          
          {message && (
            <p className={`mt-2 text-sm ${
              message.includes('success') ? 'text-green-600' : 'text-red-600'
            }`}>
              {message}
            </p>
          )}
        </div>
      </Card>

      {/* Allocations Table */}
      <Card>
        <div className="p-4">
          <h2 className="mb-4 text-xl font-semibold">Current Allocations</h2>
          {allocations.length > 0 ? (
            <Table columns={columns} data={allocations} />
          ) : (
            <p className="text-gray-500">No allocations yet</p>
          )}
        </div>
      </Card>
    </div>
  );
};

export default CourseAllocation;