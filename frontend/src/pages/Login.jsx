import { useState } from 'react';

/* 
    LOGIN 
*/

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onLoginFormSubmit = (e) => {
        e.preventDefault();

        const loginForm = {
            // username: e.target.username.value,
            email: email,
            password: password,
        }

        // ADD ENDPOINT TO BACKEND VALIDATION
        console.log(loginForm);

        // REDIRECT BACK TO THEIR PREVIOUS PAGE IF DONE 
    }
    
    return (
        <>
            <h1>Login</h1>
            {/* CHECK WHAT TO USE FOR FORMS (NOT USESTATE PERHAPS) */}
            <form onSubmit={onLoginFormSubmit}>
                {/* JUST A TEST, small note though, don't put value="" if you no wanna use usestate or something */}
                <input type="text" id="username" /> 
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <input type="submit" />
                <input type="reset" />
            </form>
        </>
    )
}

export default Login
