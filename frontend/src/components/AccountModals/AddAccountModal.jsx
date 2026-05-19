import axiosInstance from "../../utils/axiosInstance.js";
import { useState } from "react";
import { validateAddAccountForm } from "../../utils/formValidation.js";

function AddAccountModal({setIsAddOpen, refetch}) {
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
                        <input type="password" name="password" id="password" value={form.password} onChange={(e) => setForm({...form, password: e.target.value})} required className="w-full px-5 py-3 rounded-xl border border-emerald-100 bg-emerald-50/30 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 text-emerald-800" />
                        {error.password.status && <span className="text-rose-500 text-xs font-semibold mt-1 pl-2 block">{error.password.message}</span>}
                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-2 block">Confirm Password</label>
                        <input type="password" name="confirmPassword" id="confirmPassword" value={form.confirmPassword} onChange={(e) => setForm({...form, confirmPassword: e.target.value})} required className="w-full px-5 py-3 rounded-xl border border-emerald-100 bg-emerald-50/30 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 text-emerald-800" />
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