import { useState, useEffect } from 'react';
import axios from 'axios';
import { Editor } from '@tinymce/tinymce-react';
import parse from 'html-react-parser';

const AdminCourses = () => {
  const [courses, setCourses] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editCourseId, setEditCourseId] = useState(null);

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

  const handleCreateOrUpdateCourse = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', price);
    if (image) formData.append('image', image);

    try {
      if (editMode) {
        await axios.put(`http://localhost:5000/api/courses/${editCourseId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
          },
        });
      } else {
        await axios.post('http://localhost:5000/api/courses', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
          },
        });
      }
      fetchCourses();
      resetForm();
    } catch (error) {
      console.error('Error creating/updating course:', error);
    }
  };

  const handleDeleteCourse = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/courses/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
      });
      fetchCourses();
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  const handleEditCourse = (course) => {
    setTitle(course.title);
    setDescription(course.description);
    setPrice(course.price);
    setImage(null);
    setEditCourseId(course.id);
    setEditMode(true);
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setPrice('');
    setImage(null);
    setEditCourseId(null);
    setEditMode(false);
  };

  return (
    <div className="container">
      <h2>Manage Courses</h2>
      <form onSubmit={handleCreateOrUpdateCourse}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <Editor
            apiKey="nt7mwew620vcgcez82pmd1r6yzl3i62i7hv46am9w8gagd27"
            value={description}
            onEditorChange={(newDescription) => setDescription(newDescription)}
            init={{
              height: 500,
              menubar: false,
              plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount'
              ],
              toolbar:
                'undo redo | formatselect | bold italic backcolor | \
                alignleft aligncenter alignright alignjustify | \
                bullist numlist outdent indent | removeformat | help'
            }}
          />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            className="form-control"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Image</label>
          <input
            type="file"
            className="form-control"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <button type="submit" className="btn btn-primary mt-2">
          {editMode ? 'Update Course' : 'Create Course'}
        </button>
        {editMode && (
          <button type="button" className="btn btn-secondary mt-2 ml-2" onClick={resetForm}>
            Cancel Edit
          </button>
        )}
      </form>
      <div className="row mt-4">
        {courses.map((course) => (
          <div key={course.id} className="col-md-4 mb-4">
            <div className="card">
              <img src={`http://localhost:5000${course.image_url}`} className="card-img-top" alt={course.title} />
              <div className="card-body">
                <h5 className="card-title">{course.title}</h5>
                <div className="card-text">{parse(course.description.substring(0, 100))}...</div>
                <p className="card-text"><strong>Price:</strong> ${course.price}</p>
                <button className="btn btn-primary" onClick={() => handleEditCourse(course)}>
                  Edit
                </button>
                <button className="btn btn-danger mt-2" onClick={() => handleDeleteCourse(course.id)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminCourses;
