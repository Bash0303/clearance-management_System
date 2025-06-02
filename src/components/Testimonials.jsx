import React from 'react'


 const testimonials = [
    {
      id: 1,
      name: "Adebayo Ahmed",
      department: "Computer Science",
      quote: "The new course allocation system saved me hours of manual registration. So efficient!",
    },
    {
      id: 2,
      name: "Folake Johnson",
      department: "Business Administration",
      quote: "I love how I can see all my courses in one place and make changes easily.",
    },
    {
      id: 3,
      name: "Ibrahim Musa",
      department: "Electrical Engineering",
      quote: "Finally, a digital solution that works for our polytechnic. No more long queues!",
    },
]
  
const Testimonials = () => {
  return (
   <div className="py-12 bg-white">
        <div className="px-6 mx-auto max-w-7xl lg:px-8">
          <div className="text-center">
            <h2 className="text-lg font-semibold text-accent">What Students Say</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Success Stories from Our Students
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 mt-16 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="p-8 rounded-lg shadow-sm bg-gray-50">
                <div className="flex items-center">
                  <div className="ml-4">
                    <p className="text-lg font-medium text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.department}</p>
                  </div>
                </div>
                <p className="mt-4 text-gray-600">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>
  )
}

export default Testimonials
