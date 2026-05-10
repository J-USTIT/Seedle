import axios from 'axios';

// CHECK HOW TO CATCH ERROR PROPERLY
const registerUser = async (formData) => {
    const { data } = await axios.post('http://localhost:8001/api/auth/register', formData);
    return data;
}

function Register() {
    
    const onRegisterFormSubmit = (e) => {
        e.preventDefault();

        const error = {
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
            }
        }

        const username = e.target.username.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const confirmPassword = e.target.confirmPassword.value;

        if(username === ''){
            error.username.status = false;
            error.username.message = "Username field is empty.";
        }
        if(email === ''){
            error.email.status = false;
            error.email.message = "Email field is empty.";
        }
        if(password === ''){
            error.password.status = false;
            error.password.message = "Password field is empty.";
        }
        if(confirmPassword === ''){
            error.confirmPassword.status = false;
            error.confirmPassword.message = "Confirm password field is empty.";
        }
        if(password !== confirmPassword){
            error.password.status = false;
            error.confirmPassword.status = false;
            error.password.message = "Password does not match with confirm password.";
            error.confirmPassword.message = "";
        }

        const registerForm = {
            username, 
            email, 
            password,
            role: 'guest'
        };

        document.getElementById('register').reset()

        registerUser(registerForm);
        console.log(registerForm);

    }
    return (
        <>
            <h1>Register</h1>
            <form id="register" onSubmit={onRegisterFormSubmit}>
                <div>
                    <label for="username">Username:<span>*</span> </label>
                    <input type="text" id="username" minLength={3} maxLength={16} required />
                </div>
                <div>
                    <label for="email">Email: <span>*</span> </label>
                    <input type="email" id="email" minLength={10} maxLength={80} required />
                </div>
                    <label for="password">Password:<span>*</span> </label>
                    <input type="password" id="password" minLength={8} maxLength={32} required />
                <div>
                    <label for="confirmPassword">Confirm Password:<span>*</span> </label>
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

export default Register
