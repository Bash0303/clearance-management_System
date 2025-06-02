// src/pages/AdminHome.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminHome = () => {
  const [studentCount, setStudentCount] = useState(0);

  useEffect(() => {
    const fetchStudentCount = async () => {
      try {
        const res = await axios.get("http://localhost/atiba-clerance-system/student/get_student_count.php");
        if (res.data.status === "success") {
          setStudentCount(res.data.count);
        } else {
          console.error("Failed to get student count");
        }
      } catch (error) {
        console.error("Error fetching student count:", error);
      }
    };

    fetchStudentCount();
  }, []);

  return (
    <div className="bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Welcome to the Admin Dashboard</h1>
      <p className="text-gray-700 mb-4">
        Use the sidebar to manage students, review clearance requests, and update your profile.
      </p>
      <div className="bg-blue-100 p-4 rounded">
        <h2 className="text-xl font-semibold">Admin Overview</h2>
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-medium">Total Students</h3>
            <p className="text-2xl font-bold">{studentCount}</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-medium">Pending Reviews</h3>
            <p className="text-2xl font-bold">1</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-medium">Profile Updates</h3>
            <p className="text-2xl font-bold">1</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
