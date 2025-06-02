import { useEffect, useState } from 'react';
import { FaUserGraduate } from 'react-icons/fa';

const StudentProfile = () => {
  const [student, setStudent] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const storedStudent = JSON.parse(localStorage.getItem('student'));

    if (!storedStudent || !storedStudent.matric_number) {
      setError('Matric Number not found in local storage. Please log in again.');
      return;
    }

    const fetchStudent = async () => {
      try {
        const response = await fetch('http://localhost/atiba-clerance-system/student/get_student.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ matricNumber: storedStudent.matric_number }),
        });

        const data = await response.json();

        if (data.status === 'success') {
          setStudent(data.student);
        } else {
          setError(data.message || 'Failed to fetch student data');
        }
      } catch (err) {
        setError('Unable to connect to the server.');
      }
    };

    fetchStudent();
  }, []);

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  if (!student) {
    return <div className="p-4">Loading profile...</div>;
  }

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-lg shadow">
      <h2 className="text-2xl font-semibold text-blue-700 mb-4 flex items-center">
        <FaUserGraduate className="mr-2" />
        Student Profile
      </h2>

      <div className="space-y-3 text-gray-700">
        <div><strong>Full Name:</strong> {student.full_name}</div>
        <div><strong>Matric Number:</strong> {student.matric_number}</div>
        {/* Add more fields if available */}
      </div>
    </div>
  );
};

export default StudentProfile;
