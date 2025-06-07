// src/components/Courses.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import parse from 'html-react-parser';
import { Link } from 'react-router-dom'; // Correct import statement

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/courses');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/courses?search=${searchTerm}`);
      setCourses(response.data);
    } catch (error) {
      console.error('Error searching courses:', error);
    }
  };

  return (
    <div className="container">
      <h2>Services</h2>
      <input
        type="text"
        className="form-control"
        placeholder="Search courses..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch} className="btn btn-primary mt-2">Search</button>
      <div className="row mt-4">
        {courses.map((course) => (
          <div key={course.id} className="col-md-4 mb-4">
            <div className="card">
              <img src={`http://localhost:5000${course.image_url}`} className="card-img-top" alt={course.title} />
              <div className="card-body">
                <h5 className="card-title">{course.title}</h5>
                <div className="card-text">{parse(course.description.substring(0, 100))}...</div>
                <p className="card-text"><strong>Price:</strong> ${course.price}</p>
                <Link to={`/courses/${course.id}`} className="btn btn-primary">View Course</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
