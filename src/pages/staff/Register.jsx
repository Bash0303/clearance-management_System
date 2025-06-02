import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiLock, FiPhone, FiKey, FiChevronDown } from 'react-icons/fi';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        fullName: '',
        email: '',
        phone: '',
        staffNumber: '',
        position: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: null
            });
        }
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.title) newErrors.title = 'Title is required';
        if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
        if (!formData.email.match(/^[^\s@]+@kwara\.poly\.edu\.ng$/i)) {
            newErrors.email = 'Valid institutional email required (@kwara.poly.edu.ng)';
        }
        if (!formData.phone.match(/^[0-9]{11}$/)) newErrors.phone = 'Valid 11-digit phone number required';
        if (!formData.staffNumber.match(/^KWARAPOLY\/STAFF\/[0-9]{4}$/)) {
            newErrors.staffNumber = 'Staff Number must follow format: KWARAPOLY/STAFF/0000';
        }
        if (!formData.position) newErrors.position = 'Position is required';
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
            const response = await fetch('http://localhost/backend/api/staff-register.php', {
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
            navigate('/staff-login');
        } catch (error) {
            console.error('Registration Error:', error);
            alert(`Registration failed: ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen px-4 py-12 bg-gradient-to-br from-blue-50 to-indigo-100 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                <div className="overflow-hidden bg-white shadow-xl rounded-2xl">
                    {/* Header Section */}
                    <div className="px-6 py-8 text-center bg-indigo-700">
                        <div className="flex justify-center mb-4">
                            <img
                                className="w-auto h-20"
                                src="/images/kwara-poly-logo.jpeg"
                                alt="Kwara State Polytechnic"
                            />
                        </div>
                        <h2 className="text-3xl font-bold text-white">
                            Staff Registration
                        </h2>
                        <p className="mt-2 text-indigo-100">
                            Kwara State Polytechnic Course Allocation System
                        </p>
                    </div>

                    {/* Form Section */}
                    <div className="px-6 py-8 sm:p-10">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                {/* Title */}
                                <div>
                                    <label htmlFor="title" className="block mb-1 text-sm font-medium text-gray-700">
                                        Title <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <select
                                            id="title"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleChange}
                                            className={`block w-full pl-3 pr-10 py-2.5 text-base border ${errors.title ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'} rounded-md shadow-sm`}
                                        >
                                            <option value="">Select Title</option>
                                            <option value="Dr.">Dr.</option>
                                            <option value="Prof.">Prof.</option>
                                            <option value="Mr.">Mr.</option>
                                            <option value="Mrs.">Mrs.</option>
                                            <option value="Miss">Miss</option>
                                        </select>
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                            <FiChevronDown className="w-5 h-5 text-gray-400" />
                                        </div>
                                    </div>
                                    {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                                </div>

                                {/* Full Name */}
                                <div>
                                    <label htmlFor="fullName" className="block mb-1 text-sm font-medium text-gray-700">
                                        Full Name <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <FiUser className="w-5 h-5 text-gray-400" />
                                        </div>
                                        <input
                                            id="fullName"
                                            name="fullName"
                                            type="text"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            className={`block w-full pl-10 pr-3 py-2.5 border ${errors.fullName ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'} rounded-md`}
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
                                </div>

                                {/* Email */}
                                <div className="sm:col-span-2">
                                    <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">
                                        Institutional Email <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative rounded-md shadow-sm">
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
                                            className={`block w-full pl-10 pr-3 py-2.5 border ${errors.email ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'} rounded-md`}
                                        />
                                    </div>
                                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                                </div>

                                {/* Phone */}
                                <div>
                                    <label htmlFor="phone" className="block mb-1 text-sm font-medium text-gray-700">
                                        Phone Number <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <FiPhone className="w-5 h-5 text-gray-400" />
                                        </div>
                                        <input
                                            id="phone"
                                            name="phone"
                                            type="tel"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className={`block w-full pl-10 pr-3 py-2.5 border ${errors.phone ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'} rounded-md`}
                                            placeholder="08012345678"
                                        />
                                    </div>
                                    {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                                </div>

                                {/* Staff Number */}
                                <div>
                                    <label htmlFor="staffNumber" className="block mb-1 text-sm font-medium text-gray-700">
                                        Staff Number <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <FiKey className="w-5 h-5 text-gray-400" />
                                        </div>
                                        <input
                                            id="staffNumber"
                                            name="staffNumber"
                                            type="text"
                                            value={formData.staffNumber}
                                            onChange={handleChange}
                                            placeholder="KWARAPOLY/STAFF/1234"
                                            className={`block w-full pl-10 pr-3 py-2.5 border ${errors.staffNumber ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'} rounded-md`}
                                        />
                                    </div>
                                    {errors.staffNumber && <p className="mt-1 text-sm text-red-600">{errors.staffNumber}</p>}
                                </div>

                                {/* Position */}
                                <div>
                                    <label htmlFor="position" className="block mb-1 text-sm font-medium text-gray-700">
                                        Position <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <select
                                            id="position"
                                            name="position"
                                            value={formData.position}
                                            onChange={handleChange}
                                            className={`block w-full pl-3 pr-10 py-2.5 text-base border ${errors.position ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'} rounded-md shadow-sm`}
                                        >
                                            <option value="">Select Position</option>
                                            <option value="Lecturer">Lecturer</option>
                                            <option value="Senior Lecturer">Senior Lecturer</option>
                                            <option value="Principal Lecturer">Principal Lecturer</option>
                                            <option value="Chief Lecturer">Chief Lecturer</option>
                                            <option value="HOD">Head of Department</option>
                                        </select>
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                            <FiChevronDown className="w-5 h-5 text-gray-400" />
                                        </div>
                                    </div>
                                    {errors.position && <p className="mt-1 text-sm text-red-600">{errors.position}</p>}
                                </div>

                                {/* Password */}
                                <div>
                                    <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700">
                                        Password <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <FiLock className="w-5 h-5 text-gray-400" />
                                        </div>
                                        <input
                                            id="password"
                                            name="password"
                                            type={showPassword ? "text" : "password"}
                                            value={formData.password}
                                            onChange={handleChange}
                                            className={`block w-full pl-10 pr-10 py-2.5 border ${errors.password ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'} rounded-md`}
                                        />
                                        <button
                                            type="button"
                                            className="absolute inset-y-0 right-0 flex items-center pr-3"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? (
                                                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                                </svg>
                                            ) : (
                                                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                            )}
                                        </button>
                                    </div>
                                    {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                                    <p className="mt-1 text-xs text-gray-500">Must be at least 8 characters</p>
                                </div>

                                {/* Confirm Password */}
                                <div>
                                    <label htmlFor="confirmPassword" className="block mb-1 text-sm font-medium text-gray-700">
                                        Confirm Password <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <FiLock className="w-5 h-5 text-gray-400" />
                                        </div>
                                        <input
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            type={showPassword ? "text" : "password"}
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            className={`block w-full pl-10 pr-3 py-2.5 border ${errors.confirmPassword ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'} rounded-md`}
                                        />
                                    </div>
                                    {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
                                </div>
                            </div>

                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <svg className="w-5 h-5 mr-3 -ml-1 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Registering...
                                        </>
                                    ) : (
                                        'Register as Staff'
                                    )}
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
                                    onClick={() => navigate('/staff-login')}
                                    className="flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Sign in to your account
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;