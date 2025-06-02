import { useState } from 'react';
import { FaCheck, FaTimes, FaEye, FaTrash } from 'react-icons/fa';

const ReviewClearance = () => {
  // Mock data - in a real app, this would come from an API
  const [students, setStudents] = useState([
    {
      id: 1,
      name: 'John Doe',
      matricNumber: '20/1234',
      department: 'Computer Science',
      documents: [
        { name: 'Passport', uploaded: true },
        { name: 'School Fees', uploaded: true },
        { name: 'Indigene', uploaded: true },
        { name: 'Birth Certificate', uploaded: true },
        { name: 'Bursary', uploaded: true },
      ],
      status: 'pending',
      comment: ''
    },
    // More students...
  ]);

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [comment, setComment] = useState('');

  const handleApprove = (id) => {
    setStudents(students.map(student => 
      student.id === id 
        ? { ...student, status: 'approved', comment: comment || 'You have been successfully cleared for final clearance' }
        : student
    ));
    setSelectedStudent(null);
    setComment('');
  };

  const handleReject = (id) => {
    setStudents(students.map(student => 
      student.id === id 
        ? { ...student, status: 'rejected', comment: comment || 'Not successful clearance. Please upload clear pictures of all required documents.' }
        : student
    ));
    setSelectedStudent(null);
    setComment('');
  };

  const handleDeleteStudent = (id) => {
    setStudents(students.filter(student => student.id !== id));
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Review Student Clearance</h2>
      
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Matric No.</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Documents</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {students.map(student => (
                <tr key={student.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{student.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{student.matricNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{student.department}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {student.documents.filter(doc => doc.uploaded).length}/{student.documents.length}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      student.status === 'approved' ? 'bg-green-100 text-green-800' :
                      student.status === 'rejected' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => setSelectedStudent(student)}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      <FaEye />
                    </button>
                    <button
                      onClick={() => handleDeleteStudent(student.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Review Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
            <div className="p-6">
              <h3 className="text-lg font-medium mb-4">Review Clearance for {selectedStudent.name}</h3>
              
              <div className="mb-4">
                <h4 className="font-medium mb-2">Uploaded Documents:</h4>
                <ul className="list-disc pl-5">
                  {selectedStudent.documents.map((doc, index) => (
                    <li key={index} className={doc.uploaded ? 'text-green-600' : 'text-red-600'}>
                      {doc.name}: {doc.uploaded ? 'Uploaded' : 'Not Uploaded'}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mb-4">
                <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
                  Comment
                </label>
                <textarea
                  id="comment"
                  rows="3"
                  className="w-full border border-gray-300 rounded-md p-2"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Add any comments for the student..."
                ></textarea>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => handleApprove(selectedStudent.id)}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center"
                >
                  <FaCheck className="mr-2" /> Approve
                </button>
                <button
                  onClick={() => handleReject(selectedStudent.id)}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 flex items-center"
                >
                  <FaTimes className="mr-2" /> Reject
                </button>
                <button
                  onClick={() => setSelectedStudent(null)}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewClearance;