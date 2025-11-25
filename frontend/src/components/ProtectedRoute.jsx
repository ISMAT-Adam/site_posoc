// src/components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export default function ProtectedRoute({ children, allowedRoles = ['member', 'admin'] }) {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const location = useLocation();

  if (!token || !allowedRoles.includes(role)) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}