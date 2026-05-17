import { createContext, useState, useContext, useEffect} from 'react';

/**
 * AuthContext - Global authentication state
 * 
 * Provides:
 * - user: current logged user data
 * - token : JWT for API requests
 * - isAuthenticated: bool for checking if user is logged in 
 * - login: handle login
 * - logout: handle logout, clear auth data
 * - loading: bool to show loading state
 */

const AuthContext = createContext();

/**
 * AuthProvider
 * Wraps app and provides auth state and functions to all child components
 * Very useful :)
 */

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    /**
     * On app load, checks localStorage for existing token and user data
     * Yes: Load into state (logs in)
     * No: User will log in
     */

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
            setIsAuthenticated(true);
        }
        setLoading(false);
    }, []);

    /**
     * Login Function
     * @param {Object} authData login response
     * @param {string} authData.token JWT from backend
     * @param {Object} authData.user User object from backend
     */

    const login = (authData) => {
        const { token, userId, username, email } = authData;

        const userData = {
            userId,
            username,
            email
        };

        setToken(token);
        setUser(userData);
        setIsAuthenticated(true);

        // Store in localStorage for persistence
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));

        console.log("User logged in:", userData);
    };

    // Logout Function
    const logout = () => {
        setToken(null);
        setUser(null);
        setIsAuthenticated(false);

        // Clearing storage
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        console.log("User logged out");
    };

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
 * This is very useful
 * useAuth: for accessing any component to access auth context
 */

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be within an AuthProvider');
    }
    return context;
};