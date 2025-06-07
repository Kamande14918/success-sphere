// filepath: /c:/Users/user/Desktop/kamau/success2/success-sphere/frontend/src/components/SingleCourse.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const SingleCourse = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [comment, setComment] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/courses/${id}`);
        const courseData = response.data;
        setCourse({
          ...courseData,
          comments: courseData.comments || [],
          likes: courseData.likes || 0,
        });
      } catch (error) {
        console.error('Error fetching course:', error);
      }
    };

    const incrementViewCount = async () => {
      try {
        await axios.post(`http://localhost:5000/api/courses/${id}/view`, {}, {
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

    fetchCourse();
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
      const response = await axios.post(`http://localhost:5000/api/courses/${id}/comment`, { comment }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setCourse({
        ...course,
        comments: [...course.comments, response.data],
      });
      setComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div className="container">
      {course ? (
        <div>
          <h2>{course.title}</h2>
          <img src={`http://localhost:5000${course.image_url}`} alt={course.title} className="img-fluid" />
          <div dangerouslySetInnerHTML={{ __html: course.description }}></div>
          <h3>Comments</h3>
          {course.comments.length > 0 ? (
            course.comments.map((cmt, index) => (
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

export default SingleCourse;