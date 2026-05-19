import { useState } from 'react';
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import axiosInstance from '../../utils/axiosInstance';

function ArchiveAccountModal({ isArchiveConfirmOpen, setIsArchiveConfirmOpen, user, refetch }) {
    const [error, setError] = useState("");

    const archiveEvent = async (user) => {
        try {
            await axiosInstance.post("/archiveuser", { user });
            refetch();
            setIsArchiveConfirmOpen(false);
        } catch (error) {
            const message = error.response?.data?.message;
            if (message === "You cannot archive your own account.") {
                setError("You cannot archive your own account.");
            } else {
                console.log(message);
            }
        }
    }
    
    return (
        <Dialog open={isArchiveConfirmOpen} onClose={() => { setError(""); setIsArchiveConfirmOpen(false); }} className="relative z-50">
            <div className="fixed inset-0 bg-emerald-900/20 backdrop-blur-sm flex w-screen items-center justify-center p-4">
                <DialogPanel className="w-full max-w-md bg-white/95 backdrop-blur-xl rounded-[2rem] shadow-2xl border border-rose-50 p-6 sm:p-10 space-y-5">
                    <div>
                        <DialogTitle className="text-2xl font-bold text-rose-900 mb-2">Deactivate account</DialogTitle>
                        <Description className="text-rose-700/80 text-sm font-medium">This will permanently deactivate this account</Description>
                    </div>
                    
                    <p className="text-emerald-800 text-sm leading-relaxed bg-rose-50/50 p-4 rounded-xl border border-rose-100/50">
                        Are you sure you want to deactivate <span className="font-bold">{user?.username}</span>'s account? All of their data will be permanently removed.
                    </p>

                    { error && <p className="text-rose-500 text-sm font-bold bg-rose-100/50 p-3 rounded-lg">{error}</p> }
                    
                    <div className="flex justify-end gap-3 mt-6">
                        <button onClick={() => { setError(""); setIsArchiveConfirmOpen(false); }} className="px-6 py-2.5 rounded-xl bg-gray-100 text-gray-600 font-bold hover:bg-gray-200 transition-colors">Cancel</button>
                        <button onClick={() => archiveEvent(user)} className="px-6 py-2.5 rounded-xl bg-rose-500 text-white font-bold hover:bg-rose-600 transition-colors shadow-sm">Deactivate</button>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    )
}

export default ArchiveAccountModal