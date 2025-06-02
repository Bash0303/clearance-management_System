    import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaHome, 
  FaInfoCircle, 
  FaEnvelope, 
  FaUserGraduate, 
  FaUserShield,
  FaSignInAlt,
  FaCaretDown
} from 'react-icons/fa';

const Navbar = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <nav className="bg-blue-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">ATIBA UNIVERSITY OYO</Link>
        
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="flex items-center hover:text-blue-200 transition">
            <FaHome className="mr-1" /> HOME
          </Link>
          <Link to="/about" className="flex items-center hover:text-blue-200 transition">
            <FaInfoCircle className="mr-1" /> ABOUT
          </Link>
          <Link to="/contact" className="flex items-center hover:text-blue-200 transition">
            <FaEnvelope className="mr-1" /> CONTACT
          </Link>
          
          {/* Login Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setIsLoginOpen(!isLoginOpen)}
              className="flex items-center hover:text-blue-200 transition"
            >
              <FaSignInAlt className="mr-1" /> LOGIN <FaCaretDown className="ml-1" />
            </button>
            
            {isLoginOpen && (
              <div 
                className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 py-1"
                onMouseLeave={() => setIsLoginOpen(false)}
              >
                <Link 
                  to="/student-login" 
                  className="block px-4 py-2 text-gray-800 hover:bg-blue-100 flex items-center"
                >
                  <FaUserGraduate className="mr-2" /> Student Login
                </Link>
                <Link 
                  to="/admin-login" 
                  className="block px-4 py-2 text-gray-800 hover:bg-blue-100 flex items-center"
                >
                  <FaUserShield className="mr-2" /> Admin Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;