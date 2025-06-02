import React from 'react'

const HowItWorks = () => {
  return (
    <div className="py-12 bg-secondary">
        <div className="px-6 mx-auto max-w-7xl lg:px-8">
          <div className="text-center">
            <h2 className="text-lg font-semibold text-accent">Simple Process</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              How Course Allocation Works
            </p>
          </div>

          <div className="mt-10">
            <div className="relative">
              <div className="absolute left-1/2 -ml-1 h-full w-0.5 bg-accent" aria-hidden="true"></div>
              <div className="space-y-12">
                {[
                  {
                    step: "1",
                    title: "Login with your matric number",
                    description: "Access the portal using your student credentials",
                  },
                  {
                    step: "2",
                    title: "View available courses",
                    description: "Browse courses offered in your department",
                  },
                  {
                    step: "3",
                    title: "Select your preferences",
                    description: "Choose courses based on your academic plan",
                  },
                  {
                    step: "4",
                    title: "Submit for approval",
                    description: "Your HOD will review and approve your selections",
                  },
                ].map((item) => (
                  <div key={item.step} className="relative flex items-start">
                    <div className="absolute left-1/2 -ml-3.5 h-7 w-7 rounded-full bg-accent flex items-center justify-center">
                      <span className="font-bold text-white">{item.step}</span>
                    </div>
                    <div className={`ml-12 p-6 bg-white rounded-lg shadow-sm w-full ${item.step === '4' ? 'mb-0' : 'mb-12'}`}>
                      <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                      <p className="mt-2 text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default HowItWorks
