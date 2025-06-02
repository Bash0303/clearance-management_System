import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiUpload, FiFile, FiDownload, FiTrash2, FiArrowLeft } from 'react-icons/fi';

const CourseMaterials = () => {
  const { courseId } = useParams();
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('staffToken');
        let url = 'http://localhost/backend/api/staff/course-materials.php';
        if (courseId) {
          url += `?course_id=${courseId}`;
        }

        const response = await fetch(url, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch materials');
        }

        const data = await response.json();
        setMaterials(data.materials || []);
        setCourse(data.course || null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [courseId]);

  const handleDelete = async (materialId) => {
    if (!window.confirm('Are you sure you want to delete this material?')) return;
    
    try {
      const token = localStorage.getItem('staffToken');
      const response = await fetch(`http://localhost/backend/api/staff/course-materials.php?id=${materialId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete material');
      }

      setMaterials(materials.filter(m => m.id !== materialId));
    } catch (err) {
      alert(err.message);
    }
  };

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
        <div className="flex items-center">
          {courseId && (
            <Link
              to="/staff-dashboard/course-materials"
              className="flex items-center mr-4 text-gray-600 hover:text-gray-800"
            >
              <FiArrowLeft className="mr-1" />
              Back to All Materials
            </Link>
          )}
          <h2 className="text-2xl font-bold text-gray-800">
            {course ? `${course.course_code} Materials` : 'All Course Materials'}
          </h2>
        </div>
        <Link
          to={courseId ? `/staff-dashboard/course-materials/${courseId}/upload` : '/staff-dashboard/course-materials/upload'}
          className="flex items-center px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
        >
          <FiUpload className="mr-2" />
          Upload Material
        </Link>
      </div>

      {materials.length === 0 ? (
        <div className="p-8 text-center bg-white rounded-lg shadow">
          <FiFile className="w-12 h-12 mx-auto text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">No materials found</h3>
          <p className="mt-1 text-gray-500">
            {courseId ? 'Upload materials for this course' : 'You have not uploaded any materials yet'}
          </p>
        </div>
      ) : (
        <div className="overflow-hidden bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Title</th>
                {!courseId && <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Course</th>}
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {materials.map((material) => (
                <tr key={material.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{material.title}</div>
                    <div className="text-sm text-gray-500">{material.description}</div>
                  </td>
                  {!courseId && (
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{material.course_code}</div>
                      <div className="text-sm text-gray-500">{material.course_title}</div>
                    </td>
                  )}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full">
                      {material.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                    {new Date(material.upload_date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                    <div className="flex justify-end space-x-2">
                      <a
                        href={`http://localhost/backend/uploads/${material.file_path}`}
                        download
                        className="flex items-center p-1 text-green-600 rounded hover:text-green-800 hover:bg-green-50"
                      >
                        <FiDownload className="mr-1" /> Download
                      </a>
                      <button
                        onClick={() => handleDelete(material.id)}
                        className="flex items-center p-1 text-red-600 rounded hover:text-red-800 hover:bg-red-50"
                      >
                        <FiTrash2 className="mr-1" /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CourseMaterials;