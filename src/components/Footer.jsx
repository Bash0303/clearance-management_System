import { FaGraduationCap } from 'react-icons/fa'; // Using Font Awesome icon

const Footer = () => {
  return (
    <footer className="bg-gray-900">
      <div className="px-6 py-12 mx-auto max-w-7xl lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 flex items-center  gap-5">
            <div className="flex items-center">
              <img
                className="w-auto h-20 rounded-full"
                src="/images/kwara-poly-logo.jpeg"
                alt="Kwara State Polytechnic"
              />
            </div>
            <p className="mt-4 text-sm text-gray-300">
              Kwara State Polytechnic, <br /> Ilorin - Official Course Allocation System
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-sm text-gray-300 hover:text-white">Home</a></li>
              <li><a href="#" className="text-sm text-gray-300 hover:text-white">Login</a></li>
              <li><a href="#" className="text-sm text-gray-300 hover:text-white">Departments</a></li>
              <li><a href="#" className="text-sm text-gray-300 hover:text-white">Academic Calendar</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Contact</h3>
            <ul className="mt-4 space-y-2">
              <li className="text-sm text-gray-300">Registrar's Office</li>
              <li className="text-sm text-gray-300">+234 803 123 4567</li>
              <li className="text-sm text-gray-300">registrar@kwarpoly.edu.ng</li>
            </ul>
          </div>
        </div>
        <div className="pt-8 mt-12 border-t border-gray-800">
          <p className="text-sm text-center text-gray-400">
            &copy; {new Date().getFullYear()} Kwara State Polytechnic. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;




