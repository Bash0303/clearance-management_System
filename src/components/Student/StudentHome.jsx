import React from 'react';
import { FaHome, FaUserGraduate } from 'react-icons/fa';

const StudentHome = () => {
  const student = JSON.parse(localStorage.getItem('student'));

  return (
    <div className="p-6">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center mb-4">
          <FaHome className="text-blue-600 text-2xl mr-2" />
          <h2 className="text-xl font-bold text-gray-800">Welcome to Your Dashboard</h2>
        </div>

        <p className="text-gray-700">
          Hello, <span className="font-semibold">{student?.fullName || 'Student'}</span>!
        </p>
        <p className="mt-2 text-sm text-gray-600">
          You can check your clearance status, upload your documents, and manage your profile from the sidebar.
        </p>

        <div className="mt-6 bg-blue-50 p-4 rounded-md">
          <div className="flex items-center">
            <FaUserGraduate className="text-blue-500 mr-2" />
            <div>
              <p className="text-sm font-medium text-gray-700">Matric Number:</p>
              <p className="text-blue-700">{student?.matricNumber || 'Not available'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentHome;
