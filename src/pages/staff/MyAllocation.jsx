import { useEffect, useState } from 'react';
import Card from '../../components/admindashboardcomponents/Card';
import Table from '../../components/admindashboardcomponents/Table';
import Spinner from '../../components/staffdashboardcomponents/Spinner';

const MyAllocation = () => {
  const [allocations, setAllocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAllocations = async () => {
      try {
        const token = localStorage.getItem('staffToken');
        if (!token) {
          throw new Error('No authentication token found');
        }

        const response = await fetch('http://localhost/backend/api/get_staff_allocations.php', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch allocations');
        }

        const data = await response.json();
        setAllocations(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching allocations:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllocations();
  }, []);

  // Format the allocated_at date to be more readable
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Table columns configuration
  const columns = [
    { 
      header: 'Course Code', 
      accessor: 'course_code' 
    },
    { 
      header: 'Department', 
      accessor: 'department_name' 
    },
    { 
      header: 'Allocated At', 
      accessor: 'allocated_at',
      render: (value) => formatDate(value)
    },
  ];

  return (
    <div className="space-y-6">
      <Card className="p-0">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-medium leading-6 text-gray-900">My Course Allocations</h2>
        </div>
        <div className="p-6">
          {loading ? (
            <div className="flex justify-center py-8">
              <Spinner size="md" />
              <span className="ml-2 text-gray-500">Loading allocations...</span>
            </div>
          ) : error ? (
            <div className="p-4 text-sm text-red-600 bg-red-50 rounded-md">
              {error}
            </div>
          ) : allocations.length > 0 ? (
            <Table columns={columns} data={allocations} />
          ) : (
            <div className="text-center py-8 text-gray-500">
              You currently have no course allocations.
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default MyAllocation;