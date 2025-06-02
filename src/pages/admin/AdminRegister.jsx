import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiLock, FiPhone, FiKey, FiBook } from 'react-icons/fi';
import Header from '../../components/Header'
import Footer from '../../components/Footer'

const AdminRegister = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        staffId: '',
        department: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [departments, setDepartments] = useState([]);

    // Fetch departments from backend
    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const response = await fetch('http://localhost/backend/api/get_departments.php');
                if (!response.ok) {
                    throw new Error('Failed to fetch departments');
                }
                const data = await response.json();
                if (data.success && data.departments) {
                    setDepartments(data.departments);
                }
            } catch (error) {
                console.error('Error fetching departments:', error);
            }
        };

        fetchDepartments();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
        if (!formData.email.match(/^[^\s@]+@kwara\.poly\.edu\.ng$/i)) {
            newErrors.email = 'Valid institutional email required (@kwara.poly.edu.ng)';
        }
        if (!formData.phone.match(/^[0-9]{11}$/)) newErrors.phone = 'Valid 11-digit phone number required';
        if (!formData.staffId.match(/^KWARAPOLY\/ADMIN\/[0-9]{4}$/)) {
            newErrors.staffId = 'Staff ID must follow format: KWARAPOLY/ADMIN/0000';
        }
        if (!formData.department) newErrors.department = 'Department is required';
        if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        setIsSubmitting(true);

        try {
            const response = await fetch('http://localhost/backend/api/register.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const responseData = await response.json();

            if (!response.ok) {
                console.error('API Error:', responseData);
                throw new Error(responseData.message || 'Registration failed');
            }

            alert(responseData.message);
            navigate('/admin-login');
        } catch (error) {
            console.error('Registration Error:', error);
            alert(`Registration failed: ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Header />
            <div className="flex flex-col justify-center min-h-screen py-12 bg-gray-50 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="flex justify-center">
                        <div className="flex items-center justify-center w-full h-auto rounded-full">
                            <img
                                className="w-auto h-32"
                                src="/images/kwara-poly-logo.jpeg"
                                alt="Kwara State Polytechnic"
                            />
                        </div>
                    </div>
                    <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
                        Admin Registration
                    </h2>
                    <p className="mt-2 text-sm text-center text-gray-600">
                        Kwara State Polytechnic Course Allocation System
                    </p>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                                    Full Name
                                </label>
                                <div className="relative mt-1 rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <FiUser className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="fullName"
                                        name="fullName"
                                        type="text"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        className={`block w-full pl-10 pr-3 py-2 border ${errors.fullName ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                                    />
                                </div>
                                {errors.fullName && <p className="mt-2 text-sm text-red-600">{errors.fullName}</p>}
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Institutional Email
                                </label>
                                <div className="relative mt-1 rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <FiMail className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="user@kwara.poly.edu.ng"
                                        className={`block w-full pl-10 pr-3 py-2 border ${errors.email ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                                    />
                                </div>
                                {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
                            </div>

                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                    Phone Number
                                </label>
                                <div className="relative mt-1 rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <FiPhone className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className={`block w-full pl-10 pr-3 py-2 border ${errors.phone ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                                        placeholder="08012345678"
                                    />
                                </div>
                                {errors.phone && <p className="mt-2 text-sm text-red-600">{errors.phone}</p>}
                            </div>

                            <div>
                                <label htmlFor="staffId" className="block text-sm font-medium text-gray-700">
                                    Staff ID
                                </label>
                                <div className="relative mt-1 rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <FiKey className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="staffId"
                                        name="staffId"
                                        type="text"
                                        value={formData.staffId}
                                        onChange={handleChange}
                                        placeholder="KWARAPOLY/ADMIN/1234"
                                        className={`block w-full pl-10 pr-3 py-2 border ${errors.staffId ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                                    />
                                </div>
                                {errors.staffId && <p className="mt-2 text-sm text-red-600">{errors.staffId}</p>}
                            </div>

                            <div>
                                <label htmlFor="department" className="block text-sm font-medium text-gray-700">
                                    Department
                                </label>
                                <div className="relative mt-1 rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <FiBook className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <select
                                        id="department"
                                        name="department"
                                        value={formData.department}
                                        onChange={handleChange}
                                        className={`block w-full pl-10 pr-3 py-2 border ${errors.department ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                                    >
                                        <option value="">Select Department</option>

                                        {departments.map((dept) => (
                                            <option key={dept.name} value={dept.name}>
                                                {dept.name}
                                            </option>
                                        ))}
                                    </select>

                                </div>
                                {errors.department && <p className="mt-2 text-sm text-red-600">{errors.department}</p>}
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <div className="relative mt-1 rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <FiLock className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className={`block w-full pl-10 pr-3 py-2 border ${errors.password ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                                    />
                                </div>
                                {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
                            </div>

                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                    Confirm Password
                                </label>
                                <div className="relative mt-1 rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <FiLock className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className={`block w-full pl-10 pr-3 py-2 border ${errors.confirmPassword ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                                    />
                                </div>
                                {errors.confirmPassword && <p className="mt-2 text-sm text-red-600">{errors.confirmPassword}</p>}
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-900 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                                >
                                    {isSubmitting ? 'Registering...' : 'Register as Admin'}
                                </button>
                            </div>
                        </form>

                        <div className="mt-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 text-gray-500 bg-white">
                                        Already have an account?
                                    </span>
                                </div>
                            </div>

                            <div className="mt-6">
                                <button
                                    onClick={() => navigate('/admin-login')}
                                    className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-green-700 hover:bg-green-600 border border-gray-300 rounded-md shadow-sm  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Sign in instead
                                </button>
                            </div>
                        </div>
                    </div>
                </div >
            </div >
            <Footer />
        </>
    );
};

export default AdminRegister;