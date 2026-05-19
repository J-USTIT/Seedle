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
    const [showPassword, setShowPassword] = useState(false);

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
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    minLength={8}
                                    maxLength={32}
                                    required
                                    className="w-full px-5 py-3.5 bg-white/50 border border-emerald-300 hover:border-emerald-400 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-500 transition-all text-emerald-900 placeholder-emerald-600/70 shadow-sm pr-12"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-emerald-600 hover:text-emerald-800"
                                >
                                    {showPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                                            <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                        </svg>
                                    )}
                                </button>
                            </div>
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
