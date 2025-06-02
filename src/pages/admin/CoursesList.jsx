import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiBook, FiEdit2, FiEye, FiPlus, FiSearch } from 'react-icons/fi';
import axios from 'axios';

const CoursesList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost/backend/api/get-courses.php');

        if (Array.isArray(response.data)) {
          setCourses(response.data);
        } else if (response.data?.courses) {
          setCourses(response.data.courses);
        } else if (response.data?.data) {
          setCourses(response.data.data);
        } else {
          throw new Error('Invalid data format received from API');
        }

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        console.error('API Error:', err);
      }
    };

    fetchCourses();
  }, []);

  const filteredCourses = courses.filter(course => {
    const searchLower = searchTerm.toLowerCase();
    return (
      (course.course_code || '').toLowerCase().includes(searchLower) ||
      (course.course_name || '').toLowerCase().includes(searchLower) ||
      (course.department || '').toLowerCase().includes(searchLower)
    );
  });

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-12 h-12 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
    </div>
  );

  if (error) return (
    <div className="p-6 rounded-lg bg-red-50">
      <div className="font-medium text-red-600">Error: {error}</div>
      <button 
        onClick={() => window.location.reload()}
        className="px-4 py-2 mt-2 text-sm text-red-700 bg-red-100 rounded hover:bg-red-200"
      >
        Retry
      </button>
    </div>
  );

  return (
    <div className="p-6 mx-auto max-w-7xl">
      <div className="flex flex-col items-start justify-between gap-4 mb-6 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Course Management</h1>
          <p className="text-gray-500">Manage all available courses</p>
        </div>
        
        <div className="flex flex-col w-full gap-3 sm:flex-row sm:w-auto">
          <div className="relative flex-grow sm:w-64">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search courses..."
              className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Link
            to="/admin-dashboard/create-course"
            className="flex items-center justify-center px-4 py-2 text-white transition-all rounded-lg shadow-sm bg-green-900 hover:bg-green-950"
          >
            <FiPlus className="mr-2" />
            Add Course
          </Link>
        </div>
      </div>

      <div className="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-xl">
        {filteredCourses.length === 0 ? (
          <div className="p-8 text-center">
            <FiBook className="w-12 h-12 mx-auto text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">No courses found</h3>
            <p className="mt-1 text-gray-500">
              {searchTerm ? 'Try a different search term' : 'Get started by adding a new course'}
            </p>
            <div className="mt-6">
              <Link
                to="/admin-dashboard/create-course"
                className="inline-flex items-center px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                <FiPlus className="mr-2" />
                Add Course
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Course Code
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Course Name
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Credits
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Department
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredCourses.map((course) => (
                    <tr key={course.id || course.course_id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                        {course.course_code || course.code}
                      </td>
                      <td className="px-6 py-4 text-sm text-black">
                        {course.course_name || course.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                        {course.credit_hours || course.credits}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        <span className="px-2 py-1 text-xs text-blue-700 rounded-full bg-blue-50">
                          {course.department || course.dept}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                        <div className="flex justify-end space-x-2">
                          <Link
                            to={`/admin-dashboard/courses/${course.id || course.course_id}`}
                            className="flex items-center px-3 py-1 text-sm text-blue-600 transition-colors rounded-lg hover:text-blue-800 hover:bg-blue-50"
                          >
                            <FiEye className="mr-1" /> View
                          </Link>
                          <Link
                            to={`/admin-dashboard/courses/edit/${course.id || course.course_id}`}
                            className="flex items-center px-3 py-1 text-sm text-green-600 transition-colors rounded-lg hover:text-green-800 hover:bg-green-50"
                          >
                            <FiEdit2 className="mr-1" /> Edit
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-between px-6 py-3 border-t border-gray-200 bg-gray-50">
              <div className="text-sm text-gray-500">
                Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredCourses.length}</span> of{' '}
                <span className="font-medium">{filteredCourses.length}</span> courses
              </div>
              {/* Pagination would go here */}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CoursesList;