import axios from "axios";
import { useEffect, useState } from "react";

function AddAccountModal({setIsAddOpen}) {

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
        const role = addForm.role;

        const { data } = await axios.post("http://localhost:8001/api/createuser", {
            form
        });

        console.log(data);
    }

    return (
        <>
            <button onClick={() => setIsAddOpen(prev => !prev)}>Close</button>
            <form id="addForm" onSubmit={onSubmit}>
                <div>
                    <label htmlFor="username">Username: </label>
                    <input type="text" name="username" id="username" value={form.username} onChange={(e) => setForm({...form, username: e.target.value})}/>
                </div>
                <div>
                    <label htmlFor="email">Email: </label>
                    <input type="email" name="email" id="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} required/>
                </div>
                <div>
                    <label htmlFor="password">Password: </label>
                    <input type="password" name="password" id="password" value={form.password} onChange={(e) => setForm({...form, password: e.target.value})} required/>
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirm Password: </label>
                    <input type="password" name="confirmPassword" id="confirmPassword" value={form.confirmPassword} onChange={(e) => setForm({...form, confirmPassword: e.target.value})} required/>
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
