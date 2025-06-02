import React from 'react';
import Footer from '../Common/Footer';
import { FaUniversity, FaUsers, FaCalendarAlt } from 'react-icons/fa';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-8">About Atiba University Clearance System</h1>
        
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <FaUniversity className="mr-2 text-blue-600" /> Our Mission
          </h2>
          <p className="text-gray-700">
            The Atiba University Online Clearance System streamlines the final year clearance process,
            making it more efficient for both students and administrators.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <FaUsers className="mr-2 text-blue-600" /> For Students
            </h2>
            <p className="text-gray-700 mb-4">
              Submit all required clearance documents digitally and track your clearance status in real-time.
            </p>
            <ul className="list-disc pl-5 text-gray-700">
              <li>Upload documents from anywhere</li>
              <li>Instant submission confirmation</li>
              <li>Real-time status updates</li>
            </ul>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <FaCalendarAlt className="mr-2 text-blue-600" /> For Administrators
            </h2>
            <p className="text-gray-700 mb-4">
              Efficiently review student submissions and manage the clearance process.
            </p>
            <ul className="list-disc pl-5 text-gray-700">
              <li>Centralized document management</li>
              <li>Quick approval/rejection system</li>
              <li>Automated notifications</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    
  );
};

// Add this default export
export default About;