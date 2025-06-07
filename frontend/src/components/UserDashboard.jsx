import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import Navbar from './UserNavbar';
import './UserDashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment, faEye } from '@fortawesome/free-solid-svg-icons';

const UserDashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [courses, setCourses] = useState([]);
  const [blogError, setBlogError] = useState('');
  const [courseError, setCourseError] = useState('');

  useEffect(() => {
    fetchBlogs();
    fetchCourses();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/blogs');
      setBlogs(response.data.map(blog => ({
        ...blog,
        comments: blog.comments || [],
        likes: blog.likes || 0,
      })));
    } catch (error) {
      console.error('Error fetching blogs:', error);
      setBlogError('No blogs available');
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/courses');
      setCourses(response.data.map(course => ({
        ...course,
        comments: course.comments || [],
        likes: course.likes || 0,
      })));
    } catch (error) {
      console.error('Error fetching courses:', error);
      setCourseError('No courses available');
    }
  };

  const handleLikeBlog = async (id) => {
    try {
      await axios.post(`http://localhost:5000/api/blogs/${id}/like`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setBlogs(blogs.map(blog => blog.id === id ? { ...blog, likes: blog.likes + 1 } : blog));
    } catch (error) {
      console.error('Error liking blog:', error);
    }
  };

  const handleLikeCourse = async (id) => {
    try {
      await axios.post(`http://localhost:5000/api/courses/${id}/like`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setCourses(courses.map(course => course.id === id ? { ...course, likes: course.likes + 1 } : course));
    } catch (error) {
      console.error('Error liking Blogs:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        {/* Hero Section */}
        <div className="hero">
          <div className="hero-text">
            <h1>Success Sphere</h1>
            <p>Empowering you with knowledge and skills</p>
            <Link to="/courses" className="btn btn-light">Explore Courses</Link>
          </div>
        </div>

        {/* Blogs Section */}
        <div className="mt-5">
          <h2>Blogs</h2>
          {blogError && <p>{blogError}</p>}
          <div className="row">
            {blogs.length > 0 ? (
              blogs.map(blog => (
                <div key={blog.id} className="col-md-4 mb-3">
                  <div className="card">
                    <img src={`http://localhost:5000${blog.image_url}`} className="card-img-top" alt={blog.title} />
                    <div className="card-body">
                      <h5 className="card-title">{blog.title}</h5>
                      <div>{parse(blog.content.substring(0, 100))}...</div>
                      <div className="d-flex justify-content-between mt-2">
                        <div>
                          <FontAwesomeIcon icon={faHeart} onClick={() => handleLikeBlog(blog.id)} style={{ cursor: 'pointer', color: 'red' }} /> {blog.likes}
                        </div>
                        <div>
                          <FontAwesomeIcon icon={faComment} /> {blog.comments.length}
                        </div>
                        <div>
                          <FontAwesomeIcon icon={faEye} /> {blog.views}
                        </div>
                      </div>
                      <Link to={`/blogs/${blog.id}`} className="btn btn-primary mt-2">Read More</Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No blogs available</p>
            )}
          </div>
        </div>

        {/* Courses Section */}
        <div className="mt-5">
          <h2>Services</h2>
          {courseError && <p>{courseError}</p>}
          <div className="row">
            {courses.length > 0 ? (
              courses.map(course => (
                <div key={course.id} className="col-md-4 mb-3">
                  <div className="card">
                    <img src={`http://localhost:5000${course.image_url}`} className="card-img-top" alt={course.title} />
                    <div className="card-body">
                      <h5 className="card-title">{course.title}</h5>
                      <div>{parse(course.description.substring(0, 100))}...</div>
                      <div className="d-flex justify-content-between mt-2">
                        <div>
                          <FontAwesomeIcon icon={faHeart} onClick={() => handleLikeCourse(course.id)} style={{ cursor: 'pointer', color: 'red' }} /> {course.likes}
                        </div>
                        <div>
                          <FontAwesomeIcon icon={faComment} /> {course.comments.length}
                        </div>
                        <div>
                          <FontAwesomeIcon icon={faEye} /> {course.views}
                        </div>
                      </div>
                      <Link to={`/courses/${course.id}`} className="btn btn-success mt-2">View Services</Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No Services available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
