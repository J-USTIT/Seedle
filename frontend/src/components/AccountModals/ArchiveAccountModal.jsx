import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import axiosInstance from '../../utils/axiosInstance';

function ArchiveAccountModal({ isArchiveConfirmOpen, setIsArchiveConfirmOpen, user, refetch }) {
    
    const archiveEvent = async (user) => {
        try {
            const request = await axiosInstance.post("/archiveuser", {
                user
            });

            refetch();
            console.log(request);
        } catch (error) {
            const message = error.response?.data?.message;
            console.log(error);
            console.log(message);
        }

        setIsArchiveConfirmOpen(false);
    }
    
    return (
        <>
            <Dialog open={isArchiveConfirmOpen} onClose={() => setIsArchiveConfirmOpen(false)} className="relative z-50">
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                    <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
                        <DialogTitle className="font-bold">Deactivate account</DialogTitle>
                        <Description>This will permanently deactivate your account</Description>
                        <p>Are you sure you want to deactivate your account? All of your data will be permanently removed.</p>
                        <div className="flex gap-4">
                            <button onClick={() => setIsArchiveConfirmOpen(false)}>Cancel</button>
                            <button onClick={() => archiveEvent(user)}>Deactivate</button>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    )
}

export default ArchiveAccountModal
