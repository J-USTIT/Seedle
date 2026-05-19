import axiosInstance from "../../utils/axiosInstance.js";
import { useState } from "react";
import { validateEditAccountForm } from "../../utils/formValidation.js";

function EditAccountModal({setIsEditOpen, form, setForm, refetch}) {
    const [error, setError] = useState({
        username: { message: "", status: false },
        email: { message: "", status: false },
        role: { message: "", status: false },
        general: { message: "", status: false }
    });

    const onSubmit = async (e) => {
        e.preventDefault();

        const editForm = e.target;
        const validateForm = {
            username: editForm.username.value,
            email: editForm.email.value,
            role: editForm.role.value,
        }

        const {errors, isValid} = validateEditAccountForm(validateForm);
        setError(prev => ({ ...prev, ...errors, general: { message: "", status: false } }));

        if(!isValid) return

        try {
            await axiosInstance.post("/edituser", { form });
            refetch();
            setIsEditOpen(false);
        } catch (error) {
            console.log(error);
        }
    }
    
    return (
        <div className="fixed inset-0 bg-emerald-900/20 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
            <div className="w-full max-w-md bg-white/95 backdrop-blur-xl rounded-[2rem] shadow-2xl border border-emerald-50 p-6 sm:p-10 relative">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-emerald-900">Edit Account</h2>
                    <button onClick={() => setIsEditOpen(false)} className="text-emerald-400 hover:text-emerald-700 transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>

                <form id="editForm" onSubmit={onSubmit} className="flex flex-col gap-5">
                    { error.general?.status && <span className="text-rose-500 text-sm font-semibold">{error.general.message}</span> }
                    <div>
                        <label htmlFor="username" className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-2 block">Username</label>
                        <input type="text" name="username" id="username" value={form.username} onChange={(e) => setForm({...form, username: e.target.value})} className="w-full px-5 py-3 rounded-xl border border-emerald-100 bg-emerald-50/30 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 text-emerald-800" />
                        { error.username.status && <span className="text-rose-500 text-xs font-semibold mt-1 pl-2 block">{error.username.message}</span> }
                    </div>
                    <div>
                        <label htmlFor="email" className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-2 block">Email</label>
                        <input type="email" name="email" id="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} required className="w-full px-5 py-3 rounded-xl border border-emerald-100 bg-emerald-50/30 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 text-emerald-800" />
                        { error.email.status && <span className="text-rose-500 text-xs font-semibold mt-1 pl-2 block">{error.email.message}</span> }
                    </div>
                    <div>
                        <label htmlFor="role" className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-2 block">Role</label>
                        <select name="role" id="role" value={form.role} onChange={(e) => setForm({...form, role: e.target.value})} required className="w-full px-5 py-3 rounded-xl border border-emerald-100 bg-emerald-50/30 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 text-emerald-800 cursor-pointer">
                            <option value="guest">Guest</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <div className="flex justify-end gap-3 mt-4">
                        <button type="button" onClick={() => setIsEditOpen(false)} className="px-6 py-2.5 rounded-xl bg-gray-100 text-gray-600 font-bold hover:bg-gray-200 transition-colors">Cancel</button>
                        <button type="submit" className="px-6 py-2.5 rounded-xl bg-[#DAFAF1] text-[#003E33] font-bold hover:bg-[#159E5E] hover:text-white transition-colors">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditAccountModal