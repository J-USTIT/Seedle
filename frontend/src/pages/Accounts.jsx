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
        <div>
            <h1>Accounts</h1>
            {/* COULD USE DATATABLES OR SIMILAR */}
            <button onClick={onAddEvent}>Create Account</button>
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Created At</th>
                        <th>Updated At</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    { data?.userData?.map((user)=>
                        <tr key={user._id}>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{`${user.role.charAt(0).toUpperCase()}${user.role.slice(1)}`}</td>
                            <td>{user.isArchived ? "Archived" : "Active" }</td>
                            <td>{new Date(user.createdAt).toLocaleString()}</td>    
                            <td>{new Date(user.updatedAt).toLocaleString()}</td>       
                            <td>
                                <button onClick={()=>{onEditEvent(user)}} disabled={user._id === currentUser?.userId} title={user._id === currentUser?.userId ? "You cannot edit your own account." : ""}>Edit</button>
                                <button onClick={()=>{onArchiveEvent(user)}} disabled={user.isArchived || user._id === currentUser?.userId} title={user._id === currentUser?.userId ? "You cannot archive your own account." : ""}>Archive</button>
                            </td>
                        </tr>
                    ) }
                </tbody>
            </table>
            {isEditOpen && <EditAccountModal setIsEditOpen={setIsEditOpen} form={editForm} setForm={setEditForm} refetch={refetch}/> }
            {isAddOpen && <AddAccountModal setIsAddOpen={setIsAddOpen} refetch={refetch}/> }
            <ArchiveAccountModal isArchiveConfirmOpen={isArchiveConfirmOpen} setIsArchiveConfirmOpen={setIsArchiveConfirmOpen} user={archiveUser} refetch={refetch}/>
        </div>

    )
}

export default Accounts
