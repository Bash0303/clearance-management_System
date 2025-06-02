import React from 'react'

const Hero = () => {
  return (
     <div className="relative bg-primary">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-90"></div>
            <div className="relative px-6 py-24 mx-auto max-w-7xl sm:py-32 lg:px-8">
              <div className="text-center">
                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                  Streamlined Course Allocation
                </h1>
                <p className="mt-6 text-xl leading-8 text-indigo-100">
                  Kwara State Polytechnic's modern platform for easy course registration and management.
                </p>
                <div className="flex items-center justify-center mt-10 gap-x-6">
                  <a
                    href="#"
                    className="px-6 py-3 text-sm font-semibold bg-white rounded-md shadow-sm text-primary hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    Get started
                  </a>
                  <a href="#" className="text-sm font-semibold leading-6 text-white">
                    Learn more <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
  )
}

export default Hero
