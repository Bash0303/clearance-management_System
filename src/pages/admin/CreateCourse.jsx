import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateCourse = () => {
    const [courseData, setCourseData] = useState({
        courseCode: '',
        courseTitle: '',
        courseUnit: '',
        level: 'ND1',
        semester: '1'
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCourseData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setIsSubmitting(true);

        // Validation
        if (!courseData.courseCode || !courseData.courseTitle || !courseData.courseUnit) {
            setError('All fields are required');
            setIsSubmitting(false);
            return;
        }

        if (courseData.courseUnit < 1 || courseData.courseUnit > 10) {
            setError('Course unit must be between 1 and 10');
            setIsSubmitting(false);
            return;
        }

        try {
            const response = await fetch('http://localhost/backend/api/create-course.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
                },
                body: JSON.stringify(courseData)
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.error || 'Failed to create course');
            }

            setSuccess(data.message || 'Course created successfully!');
            // Reset form
            setCourseData({
                courseCode: '',
                courseTitle: '',
                courseUnit: '',
                level: 'ND1',
                semester: '1'
            });

        } catch (err) {
            setError(err.message || 'Failed to create course. Please try again.');
            console.error('Error creating course:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-h-full p-6">
            <div className="max-w-4xl mx-auto">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Create New Course</h1>
                    <p className="mt-2 text-gray-600">Fill in the details to add a new course to the system</p>
                </div>

                <div className="overflow-hidden bg-white">
                    <div className="p-8">
                        {error && (
                            <div className="p-4 mb-6 border-l-4 border-red-500 rounded bg-red-50">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <svg className="w-5 h-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm text-red-700">{error}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {success && (
                            <div className="p-4 mb-6 border-l-4 border-green-500 rounded bg-green-50">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <svg className="w-5 h-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm text-green-700">{success}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div>
                                    <label htmlFor="courseCode" className="block mb-1 text-sm font-medium text-gray-700">
                                        Course Code <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative mt-1 rounded-md shadow-sm">
                                        <input
                                            type="text"
                                            id="courseCode"
                                            name="courseCode"
                                            value={courseData.courseCode}
                                            onChange={handleChange}
                                            className="block w-full px-4 py-3 placeholder-gray-400 transition duration-150 ease-in-out border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="e.g. CSC 101"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="courseUnit" className="block mb-1 text-sm font-medium text-gray-700">
                                        Course Unit <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative mt-1 rounded-md shadow-sm">
                                        <input
                                            type="number"
                                            id="courseUnit"
                                            name="courseUnit"
                                            value={courseData.courseUnit}
                                            onChange={handleChange}
                                            className="block w-full px-4 py-3 placeholder-gray-400 transition duration-150 ease-in-out border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="e.g. 3"
                                            min="1"
                                            max="10"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="courseTitle" className="block mb-1 text-sm font-medium text-gray-700">
                                    Course Title <span className="text-red-500">*</span>
                                </label>
                                <div className="relative mt-1 rounded-md shadow-sm">
                                    <input
                                        type="text"
                                        id="courseTitle"
                                        name="courseTitle"
                                        value={courseData.courseTitle}
                                        onChange={handleChange}
                                        className="block w-full px-4 py-3 placeholder-gray-400 transition duration-150 ease-in-out border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="e.g. Introduction to Computer Science"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div>
                                    <label htmlFor="level" className="block mb-1 text-sm font-medium text-gray-700">
                                        Level
                                    </label>
                                    <div className="relative mt-1 rounded-md shadow-sm">
                                        <select
                                            id="level"
                                            name="level"
                                            value={courseData.level}
                                            onChange={handleChange}
                                            className="block w-full px-4 py-3 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-lg appearance-none focus:ring-blue-500 focus:border-blue-500"
                                        >
                                            <option value="ND1">ND1</option>
                                            <option value="ND2">ND2</option>
                                            <option value="HND1">HND1</option>
                                            <option value="HND2">HND2</option>
                                        </select>
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                            <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="semester" className="block mb-1 text-sm font-medium text-gray-700">
                                        Semester
                                    </label>
                                    <div className="relative mt-1 rounded-md shadow-sm">
                                        <select
                                            id="semester"
                                            name="semester"
                                            value={courseData.semester}
                                            onChange={handleChange}
                                            className="block w-full px-4 py-3 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-lg appearance-none focus:ring-blue-500 focus:border-blue-500"
                                        >
                                            <option value="1">First Semester</option>
                                            <option value="2">Second Semester</option>
                                        </select>
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                            <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end pt-6 space-x-4 border-t border-gray-200">
                                <button
                                    type="button"
                                    onClick={() => navigate('/admin-dashboard/courses')}
                                    className="px-6 py-3 text-sm font-medium text-gray-100 transition duration-150 ease-in-out bg-red-700 border border-gray-300 rounded-lg hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    disabled={isSubmitting}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className={`px-6 py-3 text-sm font-medium text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out ${
                                        isSubmitting ? 'bg-green-400 cursor-not-allowed' : 'bg-green-950 hover:bg-green-700'
                                    }`}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center justify-center">
                                            <svg className="w-4 h-4 mr-2 -ml-1 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Creating...
                                        </span>
                                    ) : 'Create Course'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateCourse;