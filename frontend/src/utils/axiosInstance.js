import axios from 'axios';

// Axios instance for API calls.
// Automatically adds the JWT token from sessionStorage.
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL
});

// Add auth header before each request.

axiosInstance.interceptors.request.use(
    (config) => {

        const token = sessionStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Handle 401 responses by clearing session storage and redirecting to login.
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response?.status === 401) {

            sessionStorage.removeItem('token');
            sessionStorage.removeItem('user');

            window.location.href = '/login';
            console.warn('Token expired, redirecting to login');
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
