import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-8">Contact Atiba University</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <FaEnvelope className="text-blue-600 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-gray-600">clearance@atibauniversity.edu.ng</p>
                </div>
              </div>
              
              {/* Other contact items... */}
            </div>
          </div>
          
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Send Us a Message</h2>
            <form className="space-y-4">
              {/* Form fields... */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;