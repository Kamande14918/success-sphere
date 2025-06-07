import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const SingleBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [comment, setComment] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/blogs/${id}`);
        setBlog(response.data);
      } catch (error) {
        console.error('Error fetching blog:', error);
      }
    };

    const incrementViewCount = async () => {
      try {
        await axios.post(`http://localhost:5000/api/blogs/${id}/view`, {}, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
      } catch (error) {
        console.error('Error incrementing view count:', error);
      }
    };

    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/me', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchBlog();
    incrementViewCount();
    fetchUser();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('You must be logged in to comment');
      return;
    }
    try {
      const response = await axios.post(`http://localhost:5000/api/blogs/${id}/comment`, { comment }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setBlog({
        ...blog,
        comments: [...blog.comments, response.data],
      });
      setComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div className="container">
      {blog ? (
        <div>
          <h2>{blog.title}</h2>
          <img src={`http://localhost:5000${blog.image_url}`} alt={blog.title} className="img-fluid" />
          <div dangerouslySetInnerHTML={{ __html: blog.content }}></div>
          <h3>Comments</h3>
          {blog.comments.length > 0 ? (
            blog.comments.map((cmt, index) => (
              <div key={index}>
                <strong><a href={`mailto:${cmt.email}`}>{cmt.user}</a></strong>: {cmt.comment}
              </div>
            ))
          ) : (
            <p>No comments available</p>
          )}
          <form onSubmit={handleCommentSubmit}>
            <div className="form-group">
              <textarea
                className="form-control"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary mt-2">Add Comment</button>
          </form>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default SingleBlog;