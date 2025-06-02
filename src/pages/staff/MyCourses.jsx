import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiBook, FiClock, FiUsers } from 'react-icons/fi';

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchCourses = async () => {
  //     try {
  //       const token = localStorage.getItem('staffToken');
  //       const response = await fetch('http://localhost/backend/api/staff/staff-courses.php', {
  //         headers: {
  //           'Authorization': `Bearer ${token}`
  //         }
  //       });

  //       if (!response.ok) {
  //         throw new Error('Failed to fetch courses');
  //       }

  //       const data = await response.json();
  //       setCourses(data.courses || []);
  //     } catch (err) {
  //       setError(err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchCourses();
  // }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-t-2 border-b-2 border-green-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
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
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">My Courses</h2>
      </div>

      {courses.length === 0 ? (
        <div className="p-8 text-center bg-white rounded-lg shadow">
          <FiBook className="w-12 h-12 mx-auto text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">No courses assigned</h3>
          <p className="mt-1 text-gray-500">You haven't been assigned any courses yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <div key={course.id} className="p-6 bg-white rounded-lg shadow">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-800">{course.course_code}</h3>
                  <p className="text-gray-600">{course.course_title}</p>
                </div>
                <span className="px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full">
                  {course.semester === '1' ? 'First Semester' : 'Second Semester'}
                </span>
              </div>

              <div className="mt-4 space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <FiClock className="mr-2 text-gray-400" />
                  <span>{course.credit_hours} Credit Hours</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <FiUsers className="mr-2 text-gray-400" />
                  <span>{course.student_count || 0} Students</span>
                </div>
              </div>

              <div className="mt-6 space-x-2">
                <Link
                  to={`/staff-dashboard/course-materials/${course.id}`}
                  className="inline-flex items-center px-3 py-1.5 text-sm text-white bg-green-600 rounded hover:bg-green-700"
                >
                  View Materials
                </Link>
                <Link
                  to={`/staff-dashboard/course-materials/${course.id}/upload`}
                  className="inline-flex items-center px-3 py-1.5 text-sm text-green-700 bg-green-100 rounded hover:bg-green-200"
                >
                  Upload Material
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCourses;