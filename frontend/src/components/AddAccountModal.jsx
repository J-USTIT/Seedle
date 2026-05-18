import axiosInstance from "../utils/axiosInstance.js";
import { useEffect, useState } from "react";
import { validateAddAccountForm } from "../utils/formValidation.js";

function AddAccountModal({setIsAddOpen, refetch}) {

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "guest"
    });

    const [error, setError] = useState({
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
        },
        role: {
            message: "",
            status: false
        }
    });

    const onSubmit = async (e) => {
        e.preventDefault();

        const addForm = e.target;
        const username = addForm.username;
        const email = addForm.email;
        const password = addForm.password;
        const confirmPassword = addForm.confirmPassword;
        const role = addForm.role;

        const validateForm = {
            username: username.value,
            email: email.value,
            password: password.value,
            confirmPassword: confirmPassword.value,
            role: role.value
        }

        const { errors, isValid } = validateAddAccountForm(validateForm);
        setError(errors);

        console.log(errors, isValid);

        if(!isValid) return

        try {
            const { data } = await axiosInstance.post("/createuser", {
                form
            });
            
            refetch();
            setIsAddOpen(false);
        } catch (error) {
            const message = error.response?.data?.message;

            if (message === "Email already exists.") {
                setError(prev => ({
                    ...prev,
                    email: { message: "Email is already in use.", status: true }
                }));
            } else if (message === "Username already exists.") {
                setError(prev => ({
                    ...prev,
                    username: { message: "Username is already taken.", status: true }
                }));
            } else {
                console.error(error);
            }
        }
    }

    return (
        <>
            <button onClick={() => setIsAddOpen(prev => !prev)}>Close</button>
            <form id="addForm" onSubmit={onSubmit}>
                <div>
                    <label htmlFor="username">Username: </label>
                    <input type="text" name="username" id="username" value={form.username} onChange={(e) => setForm({...form, username: e.target.value})}/>
                    {error.username.status && <span>{error.username.message}</span>}
                </div>
                <div>
                    <label htmlFor="email">Email: </label>
                    <input type="email" name="email" id="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} required/>
                    {error.email.status && <span>{error.email.message}</span>}
                </div>
                <div>
                    <label htmlFor="password">Password: </label>
                    <input type="password" name="password" id="password" value={form.password} onChange={(e) => setForm({...form, password: e.target.value})} required/>
                    {error.password.status && <span>{error.password.message}</span>}
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirm Password: </label>
                    <input type="password" name="confirmPassword" id="confirmPassword" value={form.confirmPassword} onChange={(e) => setForm({...form, confirmPassword: e.target.value})} required/>
                    {error.confirmPassword.status && <span>{error.confirmPassword.message}</span>}
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

export default AddAccountModal
