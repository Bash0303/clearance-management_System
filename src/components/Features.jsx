import React from 'react';
import { 
  FaGraduationCap, 
  FaBookOpen, 
  FaClock, 
  FaUsers, 
  FaCheckCircle, 
  FaArrowRight 
} from 'react-icons/fa';

const Features = () => {
  return (
    <div className="py-12 bg-white">
      <div className="px-6 mx-auto max-w-7xl lg:px-8">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-accent">Efficient Course Management</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Designed for Students and Faculty
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Our platform simplifies the course allocation process with intuitive features.
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                name: "Easy Registration",
                description: "Register for courses in just a few clicks",
                icon: FaBookOpen,
              },
              {
                name: "Real-time Updates",
                description: "See course availability as it changes",
                icon: FaClock,
              },
              {
                name: "Department Coordination",
                description: "Seamless integration with all departments",
                icon: FaUsers,
              },
              {
                name: "Conflict Detection",
                description: "Automatically detect schedule conflicts",
                icon: FaCheckCircle,
              },
            ].map((feature) => (
              <div key={feature.name} className="pt-6">
                <div className="flow-root h-full px-6 pb-8 rounded-lg bg-gray-50">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 shadow-lg rounded-xl bg-primary">
                        <feature.icon className="w-8 h-8 text-white" aria-hidden="true" />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-semibold leading-8 tracking-tight text-gray-900">
                      {feature.name}
                    </h3>
                    <p className="mt-5 text-base leading-7 text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Features;