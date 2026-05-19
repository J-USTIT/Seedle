import axiosInstance from "../../utils/axiosInstance.js";
import { useEffect, useState } from "react";
import { validateEditAccountForm } from "../../utils/formValidation.js";

function EditAccountModal({setIsEditOpen, form, setForm, refetch}) {
    
    const [error, setError] = useState({
        username: {
            message: "",
            status: false
        },
        email: {
            message: "",
            status: false
        },
        role: {
            message: "",
            status: false
        },
        general: {
            message: "",
            status: false
        }
    });

    const onSubmit = async (e) => {
        e.preventDefault();

        const editForm = e.target;
        const username = editForm.username;
        const email = editForm.email;
        const role = editForm.role;

        const validateForm = {
            username: username.value,
            email: email.value,
            role: role.value,
        }

        const {errors, isValid} = validateEditAccountForm(validateForm);
        setError(prev => ({ ...prev, ...errors, general: { message: "", status: false } }));

        if(!isValid) return

        try {
            const { data } = await axiosInstance.post("/edituser", {
                form
            });
            
            refetch();
            setIsEditOpen(false);
        } catch (error) {
            const message = error.response?.data?.message || error.response?.data?.errorMessage;
            if(message === "Username already exists.") 
                setError(prev => ({
                    ...prev,
                    username: {
                        message: "Username is already taken.",
                        status: true
                    }
                }));
            else if(message === "Email already exists.") 
                setError(prev => ({
                    ...prev,
                    email: {
                        message: "Email is already taken.",
                        status: true
                    }
                }));
            else if(message === "You cannot edit your own account.")
                setError(prev => ({
                    ...prev,
                    general: {
                        message: "You cannot edit your own account.",
                        status: true
                    }
                }));
            else
                setError(prev => ({
                    ...prev,
                    general: {
                        message: message || "An unexpected error occurred.",
                        status: true
                    }
                }));
        }
    }
    
    return (
        <>
            <button onClick={() => setIsEditOpen(prev => !prev)}>Close</button>
            <form id="editForm" onSubmit={onSubmit}>
                { error.general?.status && <span>{error.general.message}</span> }
                <div>
                    <label htmlFor="username">Username: </label>
                    <input type="text" name="username" id="username" value={form.username} onChange={(e) => setForm({...form, username: e.target.value})}/>
                    { error.username.status && <span>{error.username.message}</span> }
                </div>
                <div>
                    <label htmlFor="email">Email: </label>
                    <input type="email" name="email" id="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} required/>
                    { error.email.status && <span>{error.email.message}</span> }
                </div>
                <div>
                    <label htmlFor="role">Role: </label>
                    <select name="role" id="role" value={form.role} onChange={(e) => setForm({...form, role: e.target.value})} required>
                        <option value="guest">Guest</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <input type="submit" value="Submit" />
            </form>
        </>
    )
}

export default EditAccountModal
