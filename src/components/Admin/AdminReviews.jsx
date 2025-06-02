import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminReviews = () => {
  const [students, setStudents] = useState([]);
  const [comments, setComments] = useState({});
  const [loading, setLoading] = useState(true);

  // Fetch and group documents by student (matric_number)
  const fetchDocuments = async () => {
    try {
      const response = await axios.get('http://localhost/atiba-clerance-system/admin/get_uploaded_documents.php', {
        withCredentials: false,
      });

      if (Array.isArray(response.data)) {
        // Group documents by matric_number
        const grouped = response.data.reduce((acc, doc) => {
          const key = doc.matric_number || 'unknown_student';
          if (!acc[key]) {
            acc[key] = {
              matric_number: key,
              full_name: doc.full_name || key, // fallback if full_name not provided
              documents: [],
            };
          }
          acc[key].documents.push(doc);
          return acc;
        }, {});

        setStudents(Object.values(grouped));
      } else {
        setStudents([]);
        console.error('Unexpected data format:', response.data);
      }
    } catch (error) {
      console.error('Error fetching documents:', error);
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  // Track comments per document
  const handleCommentChange = (docId, value) => {
    setComments(prev => ({ ...prev, [docId]: value }));
  };

  // Update document status (accept/reject)
  const handleStatusUpdate = async (docId, status) => {
    const comment = comments[docId] || '';

    try {
      const response = await axios.post(
        'http://localhost/atiba-clerance-system/admin/update_document_status.php',
        { document_id: docId, status, comment },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: false,
        }
      );

      if (response.data.success) {
        alert('Status updated successfully!');
        fetchDocuments();
      } else {
        alert('Error: ' + (response.data.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error updating status:', error);
      alert('An error occurred while updating the status.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-100 rounded shadow">
      <h1 className="text-3xl font-bold mb-6">Review Uploaded Documents</h1>

      {loading && <p>Loading documents...</p>}

      {!loading && students.length === 0 && (
        <p className="text-center text-gray-600">No uploaded documents found.</p>
      )}

      {!loading && students.map(student => {
        // Safety check for documents array
        if (!student.documents || student.documents.length === 0) return null;

        // Filter documents with file_path or o_level_details type
        const uploadedDocs = student.documents.filter(doc =>
          doc.file_path || doc.document_type === 'o_level_details'
        );

        if (uploadedDocs.length === 0) return null;

        return (
          <div key={student.matric_number} className="bg-white rounded shadow mb-8 p-5">
            <h2 className="text-xl font-semibold mb-3">
              {student.full_name} ({student.matric_number})
            </h2>

            <ul className="space-y-6">
              {uploadedDocs.map(doc => (
                <li key={doc.id} className="border rounded p-4 bg-gray-50">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                    <div>
                      <p><strong>Document Type:</strong> {doc.document_type.replace(/_/g, ' ').toUpperCase()}</p>
                      {doc.document_type === 'o_level_details' ? (
                        <div className="mt-2">
                          <p><strong>Exam Type:</strong> {doc.exam_type}</p>
                          <p><strong>Exam Year:</strong> {doc.exam_year}</p>
                          <p><strong>Reg Number:</strong> {doc.reg_number}</p>
                          <p><strong>Serial Number:</strong> {doc.serial_number}</p>
                          <p><strong>Card Pin:</strong> {doc.pin}</p>
                        </div>
                      ) : (
                        <p className="mt-2">
                          <a
                            href={`http://localhost/atiba-clerance-system/${doc.file_path}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline"
                          >
                            View Document
                          </a>
                        </p>
                      )}
                      <p className="mt-2"><strong>Status:</strong> {doc.status || 'Pending'}</p>
                      {doc.admin_comment && (
                        <p className="mt-1 text-gray-700"><strong>Admin Comment:</strong> {doc.admin_comment}</p>
                      )}
                    </div>

                    <div className="mt-4 md:mt-0 flex flex-col space-y-2">
                      <textarea
                        placeholder="Add comment (optional)"
                        value={comments[doc.id] || ''}
                        onChange={(e) => handleCommentChange(doc.id, e.target.value)}
                        className="border rounded p-2 w-64 h-20 resize-none"
                      />

                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleStatusUpdate(doc.id, 'Accepted')}
                          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(doc.id, 'Rejected')}
                          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default AdminReviews;
