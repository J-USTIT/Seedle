import axiosInstance from "../../utils/axiosInstance.js";
import { useState } from "react";
import { validateAddAccountForm } from "../../utils/formValidation.js";

function AddAccountModal({setIsAddOpen, refetch}) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "guest"
    });

    const [error, setError] = useState({
        username: { message: "", status: false },
        email: { message: "", status: false },
        password: { message: "", status: false },
        confirmPassword: { message: "", status: false },
        role: { message: "", status: false }
    });

    const onSubmit = async (e) => {
        e.preventDefault();

        const addForm = e.target;
        const validateForm = {
            username: addForm.username.value,
            email: addForm.email.value,
            password: addForm.password.value,
            confirmPassword: addForm.confirmPassword.value,
            role: addForm.role.value,
        }

        const {errors, isValid} = validateAddAccountForm(validateForm);
        setError(prev => ({ ...prev, ...errors }));

        if(!isValid) return

        try {
            await axiosInstance.post("/createuser", { form });
            refetch();
            setIsAddOpen(false);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="fixed inset-0 bg-emerald-900/20 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
            <div className="w-full max-w-md bg-white/95 backdrop-blur-xl rounded-[2rem] shadow-2xl border border-emerald-50 p-6 sm:p-10 relative overflow-y-auto max-h-[90vh]">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-emerald-900">Create Account</h2>
                    <button onClick={() => setIsAddOpen(false)} className="text-emerald-400 hover:text-emerald-700 transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>

                <form id="addForm" onSubmit={onSubmit} className="flex flex-col gap-4">
                    <div>
                        <label htmlFor="username" className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-2 block">Username</label>
                        <input type="text" name="username" id="username" value={form.username} onChange={(e) => setForm({...form, username: e.target.value})} className="w-full px-5 py-3 rounded-xl border border-emerald-100 bg-emerald-50/30 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 text-emerald-800" />
                        {error.username.status && <span className="text-rose-500 text-xs font-semibold mt-1 pl-2 block">{error.username.message}</span>}
                    </div>
                    <div>
                        <label htmlFor="email" className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-2 block">Email</label>
                        <input type="email" name="email" id="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} required className="w-full px-5 py-3 rounded-xl border border-emerald-100 bg-emerald-50/30 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 text-emerald-800" />
                        {error.email.status && <span className="text-rose-500 text-xs font-semibold mt-1 pl-2 block">{error.email.message}</span>}
                    </div>
                    <div>
                        <label htmlFor="password" className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-2 block">Password</label>
                        <div className="relative">
                            <input type={showPassword ? "text" : "password"} name="password" id="password" value={form.password} onChange={(e) => setForm({...form, password: e.target.value})} required className="w-full px-5 py-3 rounded-xl border border-emerald-100 bg-emerald-50/30 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 text-emerald-800 pr-12" />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-4 flex items-center text-emerald-600 hover:text-emerald-800"
                            >
                                {showPassword ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" /><path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" /></svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" /></svg>
                                )}
                            </button>
                        </div>
                        {error.password.status && <span className="text-rose-500 text-xs font-semibold mt-1 pl-2 block">{error.password.message}</span>}
                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-2 block">Confirm Password</label>
                        <div className="relative">
                            <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" id="confirmPassword" value={form.confirmPassword} onChange={(e) => setForm({...form, confirmPassword: e.target.value})} required className="w-full px-5 py-3 rounded-xl border border-emerald-100 bg-emerald-50/30 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 text-emerald-800 pr-12" />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute inset-y-0 right-0 pr-4 flex items-center text-emerald-600 hover:text-emerald-800"
                            >
                                {showConfirmPassword ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" /><path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" /></svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" /></svg>
                                )}
                            </button>
                        </div>
                        {error.confirmPassword.status && <span className="text-rose-500 text-xs font-semibold mt-1 pl-2 block">{error.confirmPassword.message}</span>}
                    </div>
                    <div>
                        <label htmlFor="role" className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-2 block">Role</label>
                        <select name="role" id="role" value={form.role} onChange={(e) => setForm({...form, role: e.target.value})} required className="w-full px-5 py-3 rounded-xl border border-emerald-100 bg-emerald-50/30 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 text-emerald-800 cursor-pointer">
                            <option value="guest">Guest</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <div className="flex justify-end gap-3 mt-4">
                        <button type="button" onClick={() => setIsAddOpen(false)} className="px-6 py-2.5 rounded-xl bg-gray-100 text-gray-600 font-bold hover:bg-gray-200 transition-colors">Cancel</button>
                        <button type="submit" className="px-6 py-2.5 rounded-xl bg-[#159E5E] text-white font-bold hover:bg-[#0f7a48] transition-colors">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddAccountModal