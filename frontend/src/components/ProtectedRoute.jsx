import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ component: Component, adminOnly, ...rest }) => {
  const token = localStorage.getItem(adminOnly ? 'adminToken' : 'token');
  const isAuthenticated = !!token;

  return isAuthenticated ? <Component {...rest} /> : <Navigate to={adminOnly ? '/admin/login' : '/login'} />;
};

ProtectedRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  adminOnly: PropTypes.bool,
};

export default ProtectedRoute;
