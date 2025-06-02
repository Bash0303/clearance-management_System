import { useEffect, useState } from 'react';
import axios from 'axios';

const AdminStudents = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get("http://localhost/atiba-clerance-system/student/get_all_students.php");
        if (res.data.status === "success") {
          setStudents(res.data.students);
        } else {
          console.error("Failed to fetch students");
        }
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className="bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Manage Students</h1>
      <p className="text-gray-700 mb-4">
        Here you can view, search, and manage registered students.
      </p>

      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left border-b">Student Name</th>
            <th className="px-4 py-2 text-left border-b">Phone Number</th>
            <th className="px-4 py-2 text-left border-b">Department</th>
            <th className="px-4 py-2 text-left border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              <td className="px-4 py-2 border-b">{student.name}</td>
              <td className="px-4 py-2 border-b">{student.phone_number}</td>
              <td className="px-4 py-2 border-b">{student.course}</td>
              <td className="px-4 py-2 border-b">
                <button className="bg-yellow-500 text-white p-2 rounded">Edit</button>
                <button className="bg-red-500 text-white p-2 rounded ml-2">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminStudents;
