import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Blogs from './components/Blogs';
import SingleBlog from './components/SingleBlog';
import Courses from './components/Courses';
import SingleCourse from './components/SingleCourse';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import AdminRegister from './components/AdminRegister';
import AdminLogin from './components/AdminLogin';
import AdminNavbar from './components/AdminNavbar';
import AdminBlogs from './components/AdminBlogs';
import AdminCourses from './components/AdminCourses';
import ProtectedRoute from './components/ProtectedRoute';
import UserNavbar from './components/UserNavbar';

const MainContent = () => {
  const location = useLocation();

  return (
    <div>
      {location.pathname.startsWith('/admin') ? <AdminNavbar /> : <UserNavbar />}
      <div style={{ paddingTop: '4rem' }}> {/* Add padding to avoid content being hidden behind the fixed navbar */}
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/blogs/:id" element={<SingleBlog />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/courses/:id" element={<SingleCourse />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/admin" element={<ProtectedRoute component={AdminDashboard} adminOnly />} />
          <Route path="/user" element={<ProtectedRoute component={UserDashboard} />} />
          <Route path="/admin/register" element={<AdminRegister />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/blogs" element={<ProtectedRoute component={AdminBlogs} adminOnly />} />
          <Route path="/admin/courses" element={<ProtectedRoute component={AdminCourses} adminOnly />} />
          <Route path="/" element={<Navigate to="/user" />} />
        </Routes>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <MainContent />
    </Router>
  );
};

export default App;
