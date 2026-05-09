function Register() {

    const onRegisterFormSubmit = (e) => {
        e.preventDefault();

        const registerForm = {
            username: e.target.username.value,
            email: e.target.email.value,
            password: e.target.password.value,
        };

        console.log(registerForm);
    }
    return (
        <>
            <h1>Register</h1>
            <form onSubmit={onRegisterFormSubmit}>
                <input type="text" id="username" />
                <input type="email" id="email" />
                <input type="password" id="password" />
                <input type="submit" value="Submit "/>
                <input type="reset" />
            </form>
        </>
    )
}

export default Register
