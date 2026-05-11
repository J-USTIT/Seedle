import { useState } from 'react';
import axios from 'axios';

/* 
    LOGIN 
*/

const loginUser = async (formData) => {
    const { data } = await axios.post('http://localhost:8001/api/auth/login', formData);
    console.log(data);
    return data;
}

function Login() {

    const onLoginFormSubmit = (e) => {
        e.preventDefault();

        const form = document.getElementById('login');

        const email = form.email.value;
        const password = form.password.value;
        const confirmPassword = form.confirmPassword.value;


        const loginForm = {
            // username: e.target.username.value,
            email: email,
            password: password,
        }

        // ADD ENDPOINT TO BACKEND VALIDATION
        const test = loginUser(loginForm);
        console.log(loginForm);

        // REDIRECT BACK TO THEIR PREVIOUS PAGE IF DONE 
    }
    
    return (
        <>
            <h1>Login</h1>
            {/* CHECK WHAT TO USE FOR FORMS (NOT USESTATE PERHAPS) */}
            <form id="login" onSubmit={onLoginFormSubmit}>
                {/* JUST A TEST, small note though, don't put value="" if you no wanna use usestate or something */}
                {/* <input type="text" id="username" />  */}
                <div>
                    <label htmlFor="email">Email: <span>*</span> </label>
                    <input type="email" id="email" minLength={10} maxLength={80} required />
                </div>
                    <label htmlFor="password">Password:<span>*</span> </label>
                    <input type="password" id="password" minLength={8} maxLength={32} required />
                <div>
                    <label htmlFor="confirmPassword">Confirm Password:<span>*</span> </label>
                    <input type="password" id="confirmPassword" minLength={8} maxLength={32} required />
                </div>
                <div>
                    <input type="submit" value="Submit " />
                    <input type="reset" />
                </div>
            </form>
        </>
    )
}

export default Login
