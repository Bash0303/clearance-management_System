import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaUser, FaIdCard, FaPhone, FaVenusMars,
  FaMapMarkerAlt, FaGraduationCap, FaLock, FaCalendarAlt
} from 'react-icons/fa';

const StudentRegister = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    matricNumber: '',
    phoneNumber: '',
    gender: '',
    state: '',
    dob: '',
    department: '',
    password: '',
    confirmPassword: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.keys(formData).forEach(key => {
      formDataToSend.append(key, formData[key]);
    });

    fetch('http://localhost/atiba-clerance-system/student/student_register.php', {
      method: 'POST',
      body: formDataToSend
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          setMessage('Registration successful!');
          setFormData({
            fullName: '',
            matricNumber: '',
            phoneNumber: '',
            gender: '',
            state: '',
            dob: '',
            department: '',
            password: '',
            confirmPassword: ''
          });
        } else {
          setMessage('Error: ' + data.message);
        }
      })
      .catch(() => {
        setMessage('An error occurred. Please try again.');
      });
  };

  const renderInput = (id, name, label, type, icon, value) => (
    <div className="relative">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="flex items-center border rounded-md shadow-sm px-3 py-2">
        {icon}
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={handleChange}
          required
          className="ml-2 flex-1 border-none outline-none focus:ring-0 text-sm"
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-4xl">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Student Registration
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-4xl">
        <div className="bg-white py-8 px-6 shadow sm:rounded-lg sm:px-10">
          <form
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            onSubmit={handleSubmit}
          >
            {renderInput('fullName', 'fullName', 'Full Name', 'text', <FaUser />, formData.fullName)}
            {renderInput('matricNumber', 'matricNumber', 'Matric Number', 'text', <FaIdCard />, formData.matricNumber)}
            {renderInput('phoneNumber', 'phoneNumber', 'Phone Number', 'tel', <FaPhone />, formData.phoneNumber)}

            <div className="relative">
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                Gender
              </label>
              <div className="flex items-center border rounded-md shadow-sm px-3 py-2">
                <FaVenusMars />
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  className="ml-2 flex-1 border-none outline-none focus:ring-0 text-sm bg-white"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {renderInput('dob', 'dob', 'Date of Birth', 'date', <FaCalendarAlt />, formData.dob)}
            {renderInput('state', 'state', 'State of Origin', 'text', <FaMapMarkerAlt />, formData.state)}
            {renderInput('department', 'department', 'Department', 'text', <FaGraduationCap />, formData.department)}
            {renderInput('password', 'password', 'Password', 'password', <FaLock />, formData.password)}
            {renderInput('confirmPassword', 'confirmPassword', 'Confirm Password', 'password', <FaLock />, formData.confirmPassword)}

            <div className="col-span-1 md:col-span-2">
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Register
              </button>
            </div>
          </form>

          {message && (
            <div className="mt-4 text-center text-sm text-red-500">{message}</div>
          )}

          <div className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/student-login" className="text-blue-600 hover:underline">
              Login as Student
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentRegister;
