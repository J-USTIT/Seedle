import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../utils/axiosInstance';

/* 
    LOGIN 
*/

function Login() {
    const navigate = useNavigate();
    const { login } = useAuth(); // Get login function from context

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    // Handle input changes
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    // Handle login submit
    const onLoginFormSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setLoading(true);

        try {
            // Call login endpoint with email and password
            const { data } = await axiosInstance.post('/auth/login', {
                email: formData.email,
                password: formData.password
            });

            // Use context login function to save token and user data
            login(data);

            // Redirect to home page
            navigate('/home');
            
        } catch (error) {
            // Handle different error types
            if (error.response?.status === 401) {
                setErrors({ submit: "Invalid email or password" });
            } else if (error.response?.data?.message) {
                setErrors({ submit: error.response.data.message });
            } else {
                setErrors({ submit: "Login failed. Please try again." });
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-[85vh] bg-gradient-to-br from-[#f4f9f4] to-[#e2f0e6] p-6 font-sans">
            <div className="max-w-md w-full bg-[#FCF9F2]/90 backdrop-blur-xl rounded-[2rem] shadow-[0_20px_40px_-15px_rgba(46,125,50,0.1)] border border-white/50 p-10 relative overflow-hidden animate-fade-in-up">

                <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-200/40 rounded-full blur-2xl animate-float"></div>
                <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-green-200/40 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }}></div>

                <div className="relative z-10">
                    <div className="flex justify-center mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-600 drop-shadow-sm">
                            <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                            <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
                        </svg>
                    </div>
                    <div className="mb-10 text-center">
                        <h1 className="text-4xl font-semibold text-emerald-900 tracking-tight mb-2 p-0">Welcome Back</h1>
                        <p className="text-emerald-700/70 text-sm font-medium">Log in</p>
                    </div>

                    <form id="login" onSubmit={onLoginFormSubmit}>
                        {/* Show submission errors */}
                        {errors.submit && (
                            <div className="mb-6 p-3 bg-red-100 border border-red-300 rounded-lg text-red-700 text-sm">
                                {errors.submit}
                            </div>
                        )}

                        <div className="mb-6">
                            <label htmlFor="email" className="block text-sm font-medium text-emerald-900/80 ml-1 mb-2">
                                Email <span className="text-emerald-500">*</span>
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                                minLength={10}
                                maxLength={80}
                                required
                                className="w-full px-5 py-3.5 bg-white/50 border border-emerald-300 hover:border-emerald-400 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-500 transition-all text-emerald-900 placeholder-emerald-600/70 shadow-sm"
                                placeholder="leaf@example.com"
                            />
                        </div>

                        <div className="mb-8">
                            <label htmlFor="password" className="block text-sm font-medium text-emerald-900/80 ml-1 mb-2">
                                Password <span className="text-emerald-500">*</span>
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={formData.password}
                                onChange={handleChange}
                                minLength={8}
                                maxLength={32}
                                required
                                className="w-full px-5 py-3.5 bg-white/50 border border-emerald-300 hover:border-emerald-400 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-500 transition-all text-emerald-900 placeholder-emerald-600/70 shadow-sm"
                                placeholder="••••••••"
                            />
                        </div>

                        <div className="pt-2 flex gap-4 mt-2">
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 text-white font-medium py-3.5 px-6 rounded-2xl transition-all shadow-[0_8px_20px_-6px_rgba(5,150,105,0.4)] hover:shadow-[0_12px_25px_-6px_rgba(5,150,105,0.5)] active:scale-[0.98]"
                            >
                                {loading ? "Logging in..." : "Sign In"}
                            </button>
                            <button
                                type="reset"
                                className="px-6 py-3.5 rounded-2xl font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 hover:border-emerald-300 transition-all active:scale-[0.98]"
                            >
                                Reset
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
