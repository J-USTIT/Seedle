import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loading from './Loading';

/**
 * AdminRoute
 *
 * Wraps routes that require a specific role.
 *
 * Props:
 *   element  - the page component to render
 *   roles    - array of allowed roles, defaults to ["admin"]
 *
 * If loading:            shows loader
 * If not authenticated:  redirects to /login
 * If wrong role:         redirects to /home (or wherever you prefer)
 */
const AdminRoute = ({ element, roles = ["admin"] }) => {
    const { isAuthenticated, user, loading } = useAuth();

    if (loading) return <Loading />;

    if (!isAuthenticated) return <Navigate to="/login" replace />;

    if (!roles.includes(user?.role)) return <Navigate to="/home" replace />;

    return element;
};

export default AdminRoute;
