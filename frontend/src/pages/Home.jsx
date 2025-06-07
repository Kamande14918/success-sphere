import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [blogError, setBlogError] = useState('');
  const [courseError, setCourseError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/blogs/featured')
      .then(res => setBlogs(res.data))
      .catch(err => {
        console.error(err);
        setBlogError('No featured blogs available');
      });

    axios.get('http://localhost:5000/api/courses/featured')
      .then(res => setCourses(res.data))
      .catch(err => {
        console.error(err);
        setCourseError('No featured courses available');
      });
  }, []);

  return (
    <div className="container mt-4">
      {/* Hero Section */}
      <div className="hero text-center p-5 bg-primary text-white rounded">
        <h1>Welcome to Success-Sphere</h1>
        <p>Your go-to platform for educational blogs and courses</p>
        <Link to="/courses" className="btn btn-light">Explore Courses</Link>
      </div>

      {/* Search Bar */}
      <div className="mt-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search blogs & courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Featured Blogs Section */}
      <div className="mt-5">
        <h2>Featured Blogs</h2>
        {blogError && <p>{blogError}</p>}
        <div className="row">
          {blogs.map(blog => (
            <div key={blog.id} className="col-md-4 mb-3">
              <div className="card">
                <img src={blog.image} className="card-img-top" alt={blog.title} />
                <div className="card-body">
                  <h5 className="card-title">{blog.title}</h5>
                  <Link to={`/blogs/${blog.id}`} className="btn btn-primary">Read More</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Courses Section */}
      <div className="mt-5">
        <h2>Featured Courses</h2>
        {courseError && <p>{courseError}</p>}
        <div className="row">
          {courses.map(course => (
            <div key={course.id} className="col-md-4 mb-3">
              <div className="card">
                <img src={course.image} className="card-img-top" alt={course.title} />
                <div className="card-body">
                  <h5 className="card-title">{course.title}</h5>
                  <p>{course.description}</p>
                  <Link to={`/courses/${course.id}`} className="btn btn-success">View Course</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
