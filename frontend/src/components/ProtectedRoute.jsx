import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loading from './Loading';

/**
 * ProtectedRoute
 * 
 * Wraps routes that require authentication
 * 
 * If user authenticated: Shows the page
 * If user NOT authenticated: Redirects to login
 * If loading: Shows loader
 */

const ProtectedRoute = ({ element }) => {
    const { isAuthenticated, loading } = useAuth();
    if (loading) {
        return <Loading />;
    }

    if (isAuthenticated) {
        return element;
    }
    return <Navigate to="/login" replace />;
};

export default ProtectedRoute;