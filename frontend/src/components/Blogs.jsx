// src/components/Blogs.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Blog.css';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/blogs');
        setBlogs(response.data);
      } catch (error) {
        setError('Error fetching blogs');
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Blogs</h2>
      {error && <p>{error}</p>}
      <div className="row">
        {blogs.map(blog => (
          <div key={blog.id} className="col-md-4 mb-3">
            <div className="card">
              <img src={`http://localhost:5000${blog.image_url}`} className="card-img-top" alt={blog.title} />
              <div className="card-body">
                <h5 className="card-title">{blog.title}</h5>
                <p className="card-text">{blog.subtitle}</p>
                <Link to={`/blogs/${blog.id}`} className="btn btn-primary">Read More</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
