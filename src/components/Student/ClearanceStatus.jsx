import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ClearanceStatus = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  const matricNumber = localStorage.getItem('matric_number'); // assuming it's stored after login

  useEffect(() => {
    const fetchClearanceStatus = async () => {
      try {
        const response = await axios.post(
          'http://localhost/atiba-clerance-system/student/get_clearance_status.php',
          { matric_number: matricNumber },
          { headers: { 'Content-Type': 'application/json' } }
        );

        if (Array.isArray(response.data)) {
          setDocuments(response.data);
        } else {
          console.error('Unexpected response format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching clearance status:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClearanceStatus();
  }, [matricNumber]);

  if (loading) return <p>Loading clearance status...</p>;

  return (
    <div className="bg-white rounded p-6 shadow-md">
      <h1 className="text-2xl font-bold mb-4">My Clearance Status</h1>

      {documents.length === 0 ? (
        <p className="text-gray-600">No uploaded documents found.</p>
      ) : (
        <ul className="space-y-4">
          {documents.map((doc) => (
            <li key={doc.id} className="border rounded p-4 bg-gray-50">
              <p><strong>Document Type:</strong> {doc.document_type.replace(/_/g, ' ').toUpperCase()}</p>
              {doc.document_type === 'o_level_details' ? (
                <>
                  <p><strong>Exam Type:</strong> {doc.exam_type}</p>
                  <p><strong>Exam Year:</strong> {doc.exam_year}</p>
                  <p><strong>Reg Number:</strong> {doc.reg_number}</p>
                  <p><strong>Serial Number:</strong> {doc.serial_number}</p>
                  <p><strong>Card Pin:</strong> {doc.pin}</p>
                </>
              ) : (
                <p>
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
              <p><strong>Status:</strong> <span className={`font-semibold ${doc.status === 'Accepted' ? 'text-green-600' : doc.status === 'Rejected' ? 'text-red-600' : 'text-yellow-600'}`}>{doc.status || 'Pending'}</span></p>
              {doc.comment && (
                <p><strong>Comment:</strong> {doc.comment}</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ClearanceStatus;
