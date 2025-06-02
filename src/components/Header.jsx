import React, { useState } from 'react';
import { FaGraduationCap, FaChevronDown, FaChevronUp, FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginDropdownOpen, setLoginDropdownOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const toggleLoginDropdown = () => setLoginDropdownOpen(!loginDropdownOpen);

  return (
    <header className="bg-white shadow-sm">
      <nav className="w-full px-6 py-3 mx-auto" aria-label="Top">
        {/* Main navigation */}
        <div className="flex items-center justify-between w-full py-3 border-b border-indigo-500 lg:border-none">
          {/* Logo and institution name */}
          <div className="flex items-center">
            <img
              className="w-auto h-14"
              src="/images/kwara-poly-logo.jpeg"
              alt="Kwara State Polytechnic"
            />
            <div className="ml-4">
              <p className="text-lg font-bold text-gray-900">Kwara State Polytechnic</p>
              <p className="text-sm text-gray-500">Course Allocation System</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            <a href="/" className="text-base font-medium text-gray-900 hover:text-primary">
              Home
            </a>
            <a href="/department" className="text-base font-medium text-gray-900 hover:text-primary">
              Departments
            </a>
            <a href="#" className="text-base font-medium text-gray-900 hover:text-primary">
              Calendar
            </a>
            <a href="#" className="text-base font-medium text-gray-900 hover:text-primary">
              Help
            </a>
            {/* <a
              href="/admin-dashboard"
              className="block px-3 py-2 text-base font-medium text-gray-900 hover:text-primary hover:bg-gray-50"
            >
              Admin Dashboard
            </a>
            <a
              href="/staff-dashboard"
              className="block px-3 py-2 text-base font-medium text-gray-900 hover:text-primary hover:bg-gray-50"
            >
              Staff Dashboard
            </a> */}

            {/* Login Dropdown */}
            <div className="relative">
              <button
                onClick={toggleLoginDropdown}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-900 hover:bg-green-800 rounded-md shadow "
              >
                Logins
                {loginDropdownOpen ? (
                  <FaChevronUp className="ml-2" />
                ) : (
                  <FaChevronDown className="ml-2" />
                )}
              </button>

              {loginDropdownOpen && (
                <div className="absolute right-0 z-50 w-48 mt-8 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 ">
                  <div className="py-1">
                    {/* <a
                      href="/student-login"
                      className="block px-4 py-2 text-sm text-gray-100 hover:bg-gray-100 bg-green-900 font-medium"
                    >
                      Student Login
                    </a> */}
                    <a
                      href="/staff-login"
                      className="block px-4 py-2 text-sm text-gray-100 hover:text-gray-900 hover:bg-gray-100 bg-green-900 font-medium"
                    >
                      Staff Login
                    </a>
                    <a
                      href="/admin-login"
                      className="block px-4 py-2 text-sm text-gray-100 hover:text-gray-900 hover:bg-gray-100 bg-green-900 font-medium"
                    >
                      Admin Login
                    </a>
                    <div className="border-t border-gray-200"></div>
                    <a
                      href="/admin-register"
                      className="block px-4 py-2 text-sm text-gray-100 hover:text-gray-900 hover:bg-gray-100 bg-green-900 font-medium"
                    >
                      Admin Registration
                    </a>
                    {/* <a
                      href="/student-register"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Student Registration
                    </a> */}
                    <a
                      href="/register"
                      className="block px-4 py-2 text-sm text-gray-100 hover:text-gray-900 hover:bg-gray-100 bg-green-900 font-medium"
                    >
                      Staff Registration
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-gray-900 rounded-md hover:bg-gray-100 focus:outline-none"
            >
              {mobileMenuOpen ? (
                <FaTimes className="w-6 h-6" />
              ) : (
                <FaBars className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden">
            <div className="pt-2 pb-4 space-y-1">
              <a
                href="#"
                className="block px-3 py-2 text-base text-gray-100 hover:text-gray-900 hover:bg-gray-100 bg-green-900 font-medium"
              >
                Home
              </a>
              <a
                href="#"
                className="block px-3 py-2 text-base text-gray-100 hover:text-gray-900 hover:bg-gray-100 bg-green-900 font-medium"
              >
                Departments
              </a>
              <a
                href="#"
                className="block px-3 py-2 text-base text-gray-100 hover:text-gray-900 hover:bg-gray-100 bg-green-900 font-medium"
              >
                Calendar
              </a>
              <a
                href="#"
                className="block px-3 py-2 text-base text-gray-100 hover:text-gray-900 hover:bg-gray-100 bg-green-900 font-medium"
              >
                Help
              </a>
              
            </div>
            <div className="pt-4 pb-2 border-t border-gray-200">
              <div className="space-y-1">
                {/* <a
                  href="/student-login"
                  className="block px-3 py-2 text-base text-gray-100 hover:text-gray-900 hover:bg-gray-100 bg-green-900 font-medium"
                >
                  Student Login
                </a> */}
                <a
                  href="/staff-login"
                  className="block px-3 py-2 text-base text-gray-100 hover:text-gray-900 hover:bg-gray-100 bg-green-900 font-medium"
                >
                  Staff Login
                </a>
                <a
                  href="/admin-login"
                  className="block px-3 py-2 text-base text-gray-100 hover:text-gray-900 hover:bg-gray-100 bg-green-900 font-medium"
                >
                  Admin Login
                </a>
                {/* <a
                  href="/student-register"
                  className="block px-3 py-2 text-base text-gray-100 hover:text-gray-900 hover:bg-gray-100 bg-green-900 font-medium"
                >
                  Student Registration
                </a> */}
                <a
                  href="/register"
                  className="block px-3 py-2 text-base text-gray-100 hover:text-gray-900 hover:bg-gray-100 bg-green-900 font-medium"
                >
                  Staff Registration
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;