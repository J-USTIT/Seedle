import axios from 'axios';
import { useAuth } from '../context/AuthContext';

/**
 * Axios Instance with JWT Token Interceptor
 * 
 * Automatically adds JWT token to every API request
 * Format: Authorization: Bearer <token>
 */

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8001/api'
});

/**
 * Request Interceptor
 * Before sending request: Add token to Authorization header
 */

axiosInstance.interceptors.request.use(
    (config) => {

        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

/**
 * Response Interceptor
 * If response is 401 (Unauthorized):
 * - Token is invalid or expired
 * - You have to clear localStorage and redirect to login
 */

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response?.status === 401) {

            localStorage.removeItem('token');
            localStorage.removeItem('user');

            window.location.href = '/login';
            console.warn('Token expired, redirecting to login');
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;