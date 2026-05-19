import { useState } from "react";
import useFetch from "../hooks/useFetch"
import EditAccountModal from "../components/AccountModals/EditAccountModal.jsx";
import AddAccountModal from "../components/AccountModals/AddAccountModal.jsx";
import ArchiveAccountModal from "../components/AccountModals/ArchiveAccountModal.jsx";
import { useAuth } from "../context/AuthContext.jsx";

function Accounts() {
    const { user: currentUser } = useAuth();
    const [data, refetch] = useFetch("/users");
    const [editForm, setEditForm] = useState(null);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [archiveUser, setArchiveUser] = useState(null);
    const [isArchiveConfirmOpen, setIsArchiveConfirmOpen] = useState(false);

    const onEditEvent = (user) => {
        setEditForm(user);
        setIsEditOpen(prev => !prev);
    }

    const onAddEvent = () => {
        setIsAddOpen(prev => !prev);
    } 

    const onArchiveEvent = (user) => { 
        setArchiveUser(user);
        setIsArchiveConfirmOpen(prev => !prev);
    }

    return (
        <div className="flex flex-col items-center p-4 sm:p-6">
            <div className="w-full max-w-[1200px] bg-[#FCF9F2]/90 backdrop-blur-xl rounded-[2rem] shadow-[0_20px_40px_-15px_rgba(46,125,50,0.1)] border border-white/50 p-6 sm:p-10 relative overflow-hidden mt-8">
                <div className="absolute -top-12 -right-12 w-48 h-48 bg-emerald-200/30 rounded-full blur-3xl animate-float pointer-events-none"></div>
                <div className="absolute -bottom-12 -left-12 w-56 h-56 bg-green-200/30 rounded-full blur-3xl animate-float pointer-events-none" style={{ animationDelay: '2s' }}></div>

                <div className="relative z-10">
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-semibold text-emerald-900 tracking-tight">Accounts</h1>
                        </div>
                        <button 
                            onClick={onAddEvent}
                            className="px-6 py-2.5 rounded-full bg-[#159E5E] text-white font-bold shadow-sm hover:bg-[#0f7a48] transition-all duration-200 whitespace-nowrap"
                        >
                            Create Account
                        </button>
                    </div>

                    <div className="w-full overflow-x-auto rounded-2xl border border-emerald-50/50 shadow-sm bg-white/40 backdrop-blur-sm">
                        <table className="w-full text-left border-collapse min-w-[1000px]">
                            <thead>
                                <tr className="bg-white/60 text-emerald-800 text-xs uppercase tracking-wider font-semibold border-b border-emerald-100/50">
                                    <th className="px-5 py-4">Username</th>
                                    <th className="px-5 py-4">Email</th>
                                    <th className="px-5 py-4">Role</th>
                                    <th className="px-5 py-4">Status</th>
                                    <th className="px-5 py-4">Created At</th>
                                    <th className="px-5 py-4">Updated At</th>
                                    <th className="px-5 py-4 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody className="text-emerald-800 text-sm">
                                { data?.userData?.map((user)=>
                                    <tr key={user._id} className="border-b border-emerald-50/30 hover:bg-white/30 transition-colors">
                                        <td className="px-5 py-3 font-medium">{user.username}</td>
                                        <td className="px-5 py-3 text-emerald-700/80">{user.email}</td>
                                        <td className="px-5 py-3 font-medium">{`${user.role.charAt(0).toUpperCase()}${user.role.slice(1)}`}</td>
                                        <td className="px-5 py-3">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${user.isArchived ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'}`}>
                                                {user.isArchived ? "Archived" : "Active" }
                                            </span>
                                        </td>
                                        <td className="px-5 py-3 text-emerald-700/80">{new Date(user.createdAt).toLocaleString()}</td>    
                                        <td className="px-5 py-3 text-emerald-700/80">{new Date(user.updatedAt).toLocaleString()}</td>       
                                        <td className="px-5 py-3 flex gap-2 justify-center">
                                            <button 
                                                onClick={()=>{onEditEvent(user)}} 
                                                disabled={user._id === currentUser?.userId} 
                                                title={user._id === currentUser?.userId ? "You cannot edit your own account." : ""}
                                                className="px-4 py-1.5 rounded-full bg-[#DAFAF1] text-[#003E33] text-xs font-bold hover:bg-[#159E5E] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                Edit
                                            </button>
                                            <button 
                                                onClick={()=>{onArchiveEvent(user)}} 
                                                disabled={user.isArchived || user._id === currentUser?.userId} 
                                                title={user._id === currentUser?.userId ? "You cannot archive your own account." : ""}
                                                className="px-4 py-1.5 rounded-full bg-rose-100 text-rose-800 text-xs font-bold hover:bg-rose-500 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                Archive
                                            </button>
                                        </td>
                                    </tr>
                                ) }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {isEditOpen && <EditAccountModal setIsEditOpen={setIsEditOpen} form={editForm} setForm={setEditForm} refetch={refetch}/> }
            {isAddOpen && <AddAccountModal setIsAddOpen={setIsAddOpen} refetch={refetch}/> }
            <ArchiveAccountModal isArchiveConfirmOpen={isArchiveConfirmOpen} setIsArchiveConfirmOpen={setIsArchiveConfirmOpen} user={archiveUser} refetch={refetch}/>
        </div>
    )
}

export default Accounts