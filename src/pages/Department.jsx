import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

import Card from '../components/admindashboardcomponents/Card';

const Department = () => {
    return (
        <>
            <Header />
            <div className="space-y-6 p-20">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Department Management</h1>
                        <p className="text-gray-600">Central hub for organizing and managing academic departments</p>
                    </div>
                </div>

                <Card>
                    <div className="p-6 space-y-6">
                        <section>
                            <h2 className="text-xl font-semibold text-gray-800 mb-3">About Department Management</h2>
                            <p className="text-gray-700">
                                The Department Management system serves as the foundation for course allocation within the institution.
                                This platform enables administrators to efficiently organize academic departments, assign leadership,
                                and maintain accurate records of departmental structures.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-800 mb-3">Key Features</h2>
                            <ul className="space-y-3 list-disc pl-5 text-gray-700">
                                <li>
                                    <strong>Department Creation:</strong> Easily establish new academic departments with unique codes
                                    and designated heads of department.
                                </li>
                                <li>
                                    <strong>Comprehensive Overview:</strong> View all departments at a glance with essential details
                                    including staff counts and department codes.
                                </li>
                                <li>
                                    <strong>Efficient Search:</strong> Quickly locate specific departments using the search functionality
                                    by name or department code.
                                </li>
                                <li>
                                    <strong>Seamless Updates:</strong> Modify department information as needed to reflect organizational
                                    changes or personnel updates.
                                </li>
                                <li>
                                    <strong>System Integration:</strong> Department data seamlessly integrates with course allocation,
                                    staff management, and other academic systems.
                                </li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-800 mb-3">How It Works</h2>
                            <div className="grid md:grid-cols-3 gap-6">
                                <div className="bg-blue-50 p-4 rounded-lg">
                                    <h3 className="font-medium text-blue-800 mb-2">1. Department Setup</h3>
                                    <p className="text-gray-700">
                                        Begin by creating departments that reflect your institution's academic structure.
                                        Each department requires a unique code and name for identification.
                                    </p>
                                </div>
                                <div className="bg-green-50 p-4 rounded-lg">
                                    <h3 className="font-medium text-green-800 mb-2">2. Assign Leadership</h3>
                                    <p className="text-gray-700">
                                        Designate heads of department who will oversee course allocations and
                                        academic planning within their respective departments.
                                    </p>
                                </div>
                                <div className="bg-purple-50 p-4 rounded-lg">
                                    <h3 className="font-medium text-purple-800 mb-2">3. Ongoing Management</h3>
                                    <p className="text-gray-700">
                                        Regularly update department information to maintain accurate records as
                                        staff changes or organizational restructuring occurs.
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-800 mb-3">Best Practices</h2>
                            <div className="border-l-4 border-blue-500 pl-4 py-2 bg-blue-50/50">
                                <p className="text-gray-700 italic">
                                    "Consistent department coding and naming conventions across the institution
                                    significantly improve system efficiency and reporting accuracy."
                                </p>
                            </div>
                            <ul className="mt-4 space-y-3 list-decimal pl-5 text-gray-700">
                                <li>Establish clear naming conventions for all departments</li>
                                <li>Regularly review and update department leadership assignments</li>
                                <li>Archive rather than delete inactive departments for historical reporting</li>
                                <li>Conduct annual audits of department information for accuracy</li>
                            </ul>
                        </section>

                        <section className="pt-4">
                            <h2 className="text-xl font-semibold text-gray-800 mb-3">Getting Started</h2>
                            <p className="text-gray-700 mb-4">
                                To begin managing departments, navigate to the Department Management section
                                in the sidebar. From there you can view existing departments, create new ones,
                                or modify current department information.
                            </p>
                            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                                <p className="text-yellow-800">
                                    <strong>Note:</strong> Department changes may affect course allocations.
                                    Please coordinate with academic planning when making structural changes.
                                </p>
                            </div>
                        </section>
                    </div>
                </Card>
            </div>
            <Footer />
        </>
    );
};

export default Department;