import { Link, useNavigate } from 'react-router-dom';
import './UserNavbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const UserNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="navbar-brand">Success Sphere</Link>
        <div className="navbar-links">
          <Link to="/user">
            <FontAwesomeIcon icon={faHome} /> Home
          </Link>
          <Link to="/blogs">Blogs</Link>
          <Link to="/courses">Courses</Link>
          <button onClick={handleLogout} className="btn btn-link text-white">
            <FontAwesomeIcon icon={faSignOutAlt} /> Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default UserNavbar;
