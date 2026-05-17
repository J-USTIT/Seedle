import { createContext, useState, useContext, useEffect } from 'react';

/**
 * AuthContext - Global authentication state
 * 
 * This context provides:
 * - user: Current logged-in user data
 * - token: JWT token for API requests
 * - isAuthenticated: Boolean to check if user is logged in
 * - login: Function to handle login
 * - logout: Function to clear auth data
 * - loading: Boolean to show loading state
 */
const AuthContext = createContext();

/**
 * AuthProvider Component
 * Wraps the entire app and provides auth context to all child components
 */
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    /**
     * On app load: Check if token exists in localStorage
     * If yes: Load it into state (user is already logged in)
     * If no: User needs to login
     */
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
            setIsAuthenticated(true);
        }

        setLoading(false); // Done checking localStorage
    }, []);

    /**
     * LOGIN function
     * Called after successful registration or login API call
     * 
     * @param {Object} authData - Data from login response
     * @param {string} authData.token - JWT token from backend
     * @param {Object} authData.user - User object from backend
     */
    const login = (authData) => {
        const { token, userId, username, email } = authData;

        // Create user object
        const userData = {
            userId,
            username,
            email
        };

        // Save to state
        setToken(token);
        setUser(userData);
        setIsAuthenticated(true);

        // Persist to localStorage so user stays logged in on page refresh
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));

        console.log("User logged in:", userData);
    };

    /**
     * LOGOUT function
     * Clears all auth data from state and localStorage
     */
    const logout = () => {
        // Clear state
        setToken(null);
        setUser(null);
        setIsAuthenticated(false);

        // Clear localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        console.log("User logged out");
    };

    // Context value - what components can access
    const value = {
        user,
        token,
        isAuthenticated,
        loading,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

/**
 * Custom Hook: useAuth
 * Use this in any component to access auth context
 * 
 * Example:
 * const { user, token, isAuthenticated, login, logout } = useAuth();
 */
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};