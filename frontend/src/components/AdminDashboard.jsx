// src/components/AdminDashboard.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchBlogs();
    fetchCourses();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/blogs');
      setBlogs(response.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/courses');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const handleDeleteBlog = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/blogs/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
      });
      setBlogs(blogs.filter((blog) => blog.id !== id));
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  const handleDeleteCourse = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/courses/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
      });
      setCourses(courses.filter((course) => course.id !== id));
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  return (
    <div className="container">
      <h2>Admin Dashboard</h2>
      <h3>Blogs</h3>
      <div className="row">
        {blogs.map((blog) => (
          <div key={blog.id} className="col-md-4 mb-4">
            <div className="card">
              <img src={blog.image_url} className="card-img-top" alt={blog.title} />
              <div className="card-body">
                <h5 className="card-title">{blog.title}</h5>
                <p className="card-text">{blog.content.substring(0, 100)}...</p>
                <button className="btn btn-primary">Edit</button>
                <button className="btn btn-danger" onClick={() => handleDeleteBlog(blog.id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <h3>Courses</h3>
      <div className="row">
        {courses.map((course) => (
          <div key={course.id} className="col-md-4 mb-4">
            <div className="card">
              <img src={course.image_url} className="card-img-top" alt={course.title} />
              <div className="card-body">
                <h5 className="card-title">{course.title}</h5>
                <p className="card-text">{course.description.substring(0, 100)}...</p>
                <p className="card-text"><strong>Price:</strong> ${course.price}</p>
                <button className="btn btn-primary">Edit</button>
                <button className="btn btn-danger" onClick={() => handleDeleteCourse(course.id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
