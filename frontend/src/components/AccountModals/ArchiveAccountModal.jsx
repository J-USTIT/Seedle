import { useState } from 'react';
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import axiosInstance from '../../utils/axiosInstance';

function ArchiveAccountModal({ isArchiveConfirmOpen, setIsArchiveConfirmOpen, user, refetch }) {
    const [error, setError] = useState("");

    const archiveEvent = async (user) => {
        try {
            const request = await axiosInstance.post("/archiveuser", {
                user
            });

            refetch();
            console.log(request);
            setIsArchiveConfirmOpen(false);
        } catch (error) {
            const message = error.response?.data?.message;
            console.log(error);
            if (message === "You cannot archive your own account.") {
                setError("You cannot archive your own account.");
            } else {
                console.log(message);
            }
        }
    }
    
    return (
        <>
            <Dialog open={isArchiveConfirmOpen} onClose={() => { setError(""); setIsArchiveConfirmOpen(false); }} className="relative z-50">
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                    <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
                        <DialogTitle className="font-bold">Deactivate account</DialogTitle>
                        <Description>This will permanently deactivate your account</Description>
                        <p>Are you sure you want to deactivate your account? All of your data will be permanently removed.</p>
                        { error && <p style={{ color: 'red' }}>{error}</p> }
                        <div className="flex gap-4">
                            <button onClick={() => { setError(""); setIsArchiveConfirmOpen(false); }}>Cancel</button>
                            <button onClick={() => archiveEvent(user)}>Deactivate</button>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    )
}

export default ArchiveAccountModal
