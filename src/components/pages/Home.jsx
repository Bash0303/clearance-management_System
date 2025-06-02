import Navbar from '../Common/Navbar';
import { FaStream, FaArrowRight } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow mt-12">
        {/* Main Header Section */}
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="bg-purple-600 text-white border border-purple-800 rounded-xl p-6 text-center shadow-md">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
              Atiba University Online Clearance System
            </h1>
            <p className="mt-6 max-w-lg mx-auto text-xl text-white">
              Streamline our Final Year Clearance System
            </p>
          </div>
        </div>

        {/* Explore More Section */}
        <div className="bg-purple-100 py-10 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-semibold text-purple-800 mb-4">EXPLORE MORE</h2>
            <FaArrowRight className="mx-auto text-4xl text-purple-600 animate-bounce" />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
