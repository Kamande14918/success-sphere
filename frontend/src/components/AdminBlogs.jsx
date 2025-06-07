import { useState, useEffect } from 'react';
import axios from 'axios';
import { Editor } from '@tinymce/tinymce-react';
import parse from 'html-react-parser';
import './AdminBlogs.css'; // Import custom CSS for styling

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editBlogId, setEditBlogId] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/blogs');
      setBlogs(response.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  const handleCreateOrUpdateBlog = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('subtitle', subtitle);
    formData.append('content', content);
    if (image) formData.append('image', image);

    try {
      if (editMode) {
        await axios.put(`http://localhost:5000/api/blogs/${editBlogId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
          },
        });
      } else {
        await axios.post('http://localhost:5000/api/blogs', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
          },
        });
      }
      fetchBlogs();
      resetForm();
    } catch (error) {
      console.error('Error creating/updating blog:', error);
    }
  };

  const handleDeleteBlog = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/blogs/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
      });
      fetchBlogs();
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  const handleEditBlog = (blog) => {
    setTitle(blog.title);
    setSubtitle(blog.subtitle);
    setContent(blog.content);
    setImage(null);
    setEditBlogId(blog.id);
    setEditMode(true);
  };

  const resetForm = () => {
    setTitle('');
    setSubtitle('');
    setContent('');
    setImage(null);
    setEditBlogId(null);
    setEditMode(false);
  };

  return (
    <div className="container">
      <h2>Manage Blogs</h2>
      <form onSubmit={handleCreateOrUpdateBlog}>
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
          <label>Subtitle</label>
          <input
            type="text"
            className="form-control"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Content</label>
          <Editor
            apiKey="nt7mwew620vcgcez82pmd1r6yzl3i62i7hv46am9w8gagd27"
            value={content}
            onEditorChange={(newContent) => setContent(newContent)}
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
                bullist numlist outdent indent | removeformat | help',
              external_plugins: {
                'advlist': 'https://cdn.tiny.cloud/1/nt7mwew620vcgcez82pmd1r6yzl3i62i7hv46am9w8gagd27/tinymce/7.6.1-131/plugins/advlist/plugin.min.js',
                'autolink': 'https://cdn.tiny.cloud/1/nt7mwew620vcgcez82pmd1r6yzl3i62i7hv46am9w8gagd27/tinymce/7.6.1-131/plugins/autolink/plugin.min.js',
                'lists': 'https://cdn.tiny.cloud/1/nt7mwew620vcgcez82pmd1r6yzl3i62i7hv46am9w8gagd27/tinymce/7.6.1-131/plugins/lists/plugin.min.js',
                'link': 'https://cdn.tiny.cloud/1/nt7mwew620vcgcez82pmd1r6yzl3i62i7hv46am9w8gagd27/tinymce/7.6.1-131/plugins/link/plugin.min.js',
                'image': 'https://cdn.tiny.cloud/1/nt7mwew620vcgcez82pmd1r6yzl3i62i7hv46am9w8gagd27/tinymce/7.6.1-131/plugins/image/plugin.min.js',
                'charmap': 'https://cdn.tiny.cloud/1/nt7mwew620vcgcez82pmd1r6yzl3i62i7hv46am9w8gagd27/tinymce/7.6.1-131/plugins/charmap/plugin.min.js',
                'print': 'https://cdn.tiny.cloud/1/nt7mwew620vcgcez82pmd1r6yzl3i62i7hv46am9w8gagd27/tinymce/7.6.1-131/plugins/print/plugin.min.js',
                'preview': 'https://cdn.tiny.cloud/1/nt7mwew620vcgcez82pmd1r6yzl3i62i7hv46am9w8gagd27/tinymce/7.6.1-131/plugins/preview/plugin.min.js',
                'anchor': 'https://cdn.tiny.cloud/1/nt7mwew620vcgcez82pmd1r6yzl3i62i7hv46am9w8gagd27/tinymce/7.6.1-131/plugins/anchor/plugin.min.js',
                'searchreplace': 'https://cdn.tiny.cloud/1/nt7mwew620vcgcez82pmd1r6yzl3i62i7hv46am9w8gagd27/tinymce/7.6.1-131/plugins/searchreplace/plugin.min.js',
                'visualblocks': 'https://cdn.tiny.cloud/1/nt7mwew620vcgcez82pmd1r6yzl3i62i7hv46am9w8gagd27/tinymce/7.6.1-131/plugins/visualblocks/plugin.min.js',
                'code': 'https://cdn.tiny.cloud/1/nt7mwew620vcgcez82pmd1r6yzl3i62i7hv46am9w8gagd27/tinymce/7.6.1-131/plugins/code/plugin.min.js',
                'fullscreen': 'https://cdn.tiny.cloud/1/nt7mwew620vcgcez82pmd1r6yzl3i62i7hv46am9w8gagd27/tinymce/7.6.1-131/plugins/fullscreen/plugin.min.js',
                'insertdatetime': 'https://cdn.tiny.cloud/1/nt7mwew620vcgcez82pmd1r6yzl3i62i7hv46am9w8gagd27/tinymce/7.6.1-131/plugins/insertdatetime/plugin.min.js',
                'media': 'https://cdn.tiny.cloud/1/nt7mwew620vcgcez82pmd1r6yzl3i62i7hv46am9w8gagd27/tinymce/7.6.1-131/plugins/media/plugin.min.js',
                'table': 'https://cdn.tiny.cloud/1/nt7mwew620vcgcez82pmd1r6yzl3i62i7hv46am9w8gagd27/tinymce/7.6.1-131/plugins/table/plugin.min.js',
                'paste': 'https://cdn.tiny.cloud/1/nt7mwew620vcgcez82pmd1r6yzl3i62i7hv46am9w8gagd27/tinymce/7.6.1-131/plugins/paste/plugin.min.js',
                'help': 'https://cdn.tiny.cloud/1/nt7mwew620vcgcez82pmd1r6yzl3i62i7hv46am9w8gagd27/tinymce/7.6.1-131/plugins/help/plugin.min.js',
                'wordcount': 'https://cdn.tiny.cloud/1/nt7mwew620vcgcez82pmd1r6yzl3i62i7hv46am9w8gagd27/tinymce/7.6.1-131/plugins/wordcount/plugin.min.js'
              }
            }}
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
          {editMode ? 'Update Blog' : 'Create Blog'}
        </button>
        {editMode && (
          <button type="button" className="btn btn-secondary mt-2 ml-2" onClick={resetForm}>
            Cancel Edit
          </button>
        )}
      </form>
      <div className="row mt-4">
        {blogs.map((blog) => (
          <div key={blog.id} className="col-md-4 mb-4">
            <div className="card">
              <img src={`http://localhost:5000${blog.image_url}`} className="card-img-top" alt={blog.title} />
              <div className="card-body">
                <h5 className="card-title">{blog.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{blog.subtitle}</h6>
                <div className="content mt-2">{parse(blog.content.substring(0, 100))}...</div>
                <button className="btn btn-primary mt-2" onClick={() => handleEditBlog(blog)}>
                  Edit
                </button>
                <button className="btn btn-danger mt-2 ml-2" onClick={() => handleDeleteBlog(blog.id)}>
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

export default AdminBlogs;
