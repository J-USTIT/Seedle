import { createContext, useState, useContext, useEffect} from 'react';

// AuthContext provides auth state and actions for the app.
// - user: logged-in user data
// - token: JWT for API calls
// - isAuthenticated: login state
// - login: save auth data
// - logout: clear auth data
// - loading: auth initialization state
const AuthContext = createContext();

// AuthProvider wraps the app and manages auth state.

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

        // On load, restore auth state from sessionStorage if available.
    useEffect(() => {
        const storedToken = sessionStorage.getItem('token');
        const storedUser = sessionStorage.getItem('user');

        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
            setIsAuthenticated(true);
        }
        setLoading(false);
    }, []);

        // Login and store token/user in sessionStorage.
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

        // Store in sessionStorage for persistence within this tab
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('user', JSON.stringify(userData));

        console.log("User logged in:", userData);
    };

    // Logout and clear sessionStorage.
    const logout = () => {
        setToken(null);
        setUser(null);
        setIsAuthenticated(false);

        // Clearing storage
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');

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

// Hook for accessing auth context from components.

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be within an AuthProvider');
    }
    return context;
};
