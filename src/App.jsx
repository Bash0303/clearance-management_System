import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Common/Navbar';
import Footer from './components/Common/Footer';

// Public Pages
import Home from './components/pages/Home';
import About from './components/pages/About';
import Contact from './components/pages/Contact';

// Auth Pages
import StudentLogin from './components/Auth/StudentLogin';
import StudentRegister from './components/Auth/StudentRegister';
import AdminLogin from './components/Auth/AdminLogin';
import AdminRegister from './components/Auth/AdminRegister';

// Student Dashboard & Pages
import StudentDashboard from './components/Student/StudentDashboard';
import StudentHome from './components/Student/StudentHome';
import StudentProfile from './components/Student/StudentProfile';
import ClearanceStatus from './components/Student/ClearanceStatus';
import UploadDocuments from './components/Student/UploadDocuments';

// Admin Dashboard & Pages
import AdminDashboard from './components/Admin/AdminDashboard';
import AdminHome from './components/Admin/AdminHome';
import AdminStudents from './components/Admin/AdminStudents';
import AdminReviews from './components/Admin/AdminReviews';
import AdminProfile from './components/Admin/AdminProfile';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-grow">
          <Routes>
            {/* Public Pages */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />

            {/* Auth Routes */}
            <Route path="/student-login" element={<StudentLogin />} />
            <Route path="/student-register" element={<StudentRegister />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin-register" element={<AdminRegister />} />

            {/* Student Dashboard Routes */}
            <Route path="/student/dashboard" element={<StudentDashboard />}>
              <Route index element={<StudentHome />} />
              <Route path="profile" element={<StudentProfile />} />
              <Route path="status" element={<ClearanceStatus />} />
              <Route path="upload" element={<UploadDocuments />} />
            </Route>

            {/* Admin Dashboard Routes */}
            <Route path="/admin/dashboard" element={<AdminDashboard />}>
              <Route index element={<AdminHome />} />
              <Route path="students" element={<AdminStudents />} />
              <Route path="reviews" element={<AdminReviews />} />
              <Route path="profile" element={<AdminProfile />} />
            </Route>
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
