import axios from 'axios';


// CHECK HOW TO CATCH ERROR PROPERLY
const registerUser = async (formData) => {
    const { data } = await axios.post('http://localhost:8001/api/auth/register', formData);
    return data;
}

function Register() {

    const onRegisterFormSubmit = (e) => {
        e.preventDefault();

        const error = {
            username: {
                message: "",
                status: false
            },
            email: {
                message: "",
                status: false
            },
            password: {
                message: "",
                status: false
            },
            confirmPassword: {
                message: "",
                status: false
            }
        }

        const username = e.target.username.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const confirmPassword = e.target.confirmPassword.value;

        if (username === '') {
            error.username.status = false;
            error.username.message = "Username field is empty.";
        }
        if (email === '') {
            error.email.status = false;
            error.email.message = "Email field is empty.";
        }
        if (password === '') {
            error.password.status = false;
            error.password.message = "Password field is empty.";
        }
        if (confirmPassword === '') {
            error.confirmPassword.status = false;
            error.confirmPassword.message = "Confirm password field is empty.";
        }
        if (password !== confirmPassword) {
            error.password.status = false;
            error.confirmPassword.status = false;
            error.password.message = "Password does not match with confirm password.";
            error.confirmPassword.message = "";
        }

        const registerForm = {
            username,
            email,
            password,
            role: 'guest'
        };

        document.getElementById('register').reset()

        registerUser(registerForm);
        console.log(registerForm);

    }
    return (
        <div className="flex items-center justify-center min-h-[85vh] bg-gradient-to-br from-[#f4f9f4] to-[#e2f0e6] p-6 font-sans">
            <div className="max-w-md w-full bg-[#FCF9F2]/90 backdrop-blur-xl rounded-[2rem] shadow-[0_20px_40px_-15px_rgba(46,125,50,0.1)] border border-white/50 p-10 relative overflow-hidden animate-fade-in-up">
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-200/40 rounded-full blur-2xl animate-float"></div>
                <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-green-200/40 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }}></div>

                <div className="relative z-10">
                    <div className="flex justify-center mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-600 drop-shadow-sm">
                            <path d="M7 20h10" />
                            <path d="M10 20c5.5-2.5.8-6.4 3-10" />
                            <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z" />
                            <path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z" />
                        </svg>
                    </div>
                    <div className="mb-10 text-center">
                        <h1 className="text-4xl font-semibold text-emerald-900 tracking-tight mb-2 p-0">Create Account</h1>
                        <p className="text-emerald-700/70 text-sm font-medium">Register Now</p>
                    </div>

                    <form id="register" onSubmit={onRegisterFormSubmit}>
                        <div className="mb-5">
                            <label htmlFor="username" className="block text-sm font-medium text-emerald-900/80 ml-1 mb-1.5">
                                Username <span className="text-emerald-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="username"
                                minLength={3}
                                maxLength={16}
                                required
                                className="w-full px-5 py-3 bg-white/50 border border-emerald-300 hover:border-emerald-400 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-500 transition-all text-emerald-900 placeholder-emerald-600/70 shadow-sm"
                                placeholder="Name"
                            />
                        </div>

                        <div className="mb-5">
                            <label htmlFor="email" className="block text-sm font-medium text-emerald-900/80 ml-1 mb-1.5">
                                Email <span className="text-emerald-500">*</span>
                            </label>
                            <input
                                type="email"
                                id="email"
                                minLength={10}
                                maxLength={80}
                                required
                                className="w-full px-5 py-3 bg-white/50 border border-emerald-300 hover:border-emerald-400 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-500 transition-all text-emerald-900 placeholder-emerald-600/70 shadow-sm"
                                placeholder="plant@example.com"
                            />
                        </div>

                        <div className="mb-5">
                            <label htmlFor="password" className="block text-sm font-medium text-emerald-900/80 ml-1 mb-1.5">
                                Password <span className="text-emerald-500">*</span>
                            </label>
                            <input
                                type="password"
                                id="password"
                                minLength={8}
                                maxLength={32}
                                required
                                className="w-full px-5 py-3 bg-white/50 border border-emerald-300 hover:border-emerald-400 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-500 transition-all text-emerald-900 placeholder-emerald-600/70 shadow-sm"
                                placeholder="••••••••"
                            />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-emerald-900/80 ml-1 mb-1.5">
                                Confirm Password <span className="text-emerald-500">*</span>
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                minLength={8}
                                maxLength={32}
                                required
                                className="w-full px-5 py-3 bg-white/50 border border-emerald-300 hover:border-emerald-400 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-500 transition-all text-emerald-900 placeholder-emerald-600/70 shadow-sm"
                                placeholder="••••••••"
                            />
                        </div>

                        <div className="pt-2 flex gap-4 mt-2">
                            <button
                                type="submit"
                                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3.5 px-6 rounded-2xl transition-all shadow-[0_8px_20px_-6px_rgba(5,150,105,0.4)] hover:shadow-[0_12px_25px_-6px_rgba(5,150,105,0.5)] active:scale-[0.98]"
                            >
                                Sign Up
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

export default Register
