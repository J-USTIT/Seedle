const usernameRegex = /^[a-zA-Z][a-zA-Z0-9_]{2,15}$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const validateAddAccountForm = (data) => {
    const errors = {
        username: { message: "", status: false },
        email: { message: "", status: false },
        password: { message: "", status: false },
        confirmPassword: { message: "", status: false },
    }

    if(!usernameRegex.test(data.username)){
        errors.username = { message: "Invalid username format.", status: true }
    }

    if(!emailRegex.test(data.email)){
        errors.email = { message: "Invalid email format.", status: true }
    }
    
    if(data.password !== data.confirmPassword){
        errors.password = { message: "Passwords do not match.", status: true }
        errors.confirmPassword = { message: "Passwords do not match.", status: true }
    }
    
    if(!passwordRegex.test(data.password)){
        errors.password = { message: "Password is not valid.", status: true }
    }
    
    if(!passwordRegex.test(data.confirmPassword)){
        errors.confirmPassword = { message: "Password is not valid.", status: true }
    }

    const isValid = !Object.values(errors).some(error => error.status === true);

    return {errors, isValid};
}

export const validateEditAccountForm = (data) => {
    const errors = {
        username: { message: "", status: false },
        email: { message: "", status: false },
    }

    if(!usernameRegex.test(data.username)){
        errors.username = { message: "Invalid username format.", status: true }
    }

    if(!emailRegex.test(data.email)){
        errors.email = { message: "Invalid email format.", status: true }
    }
    
    const isValid = !Object.values(errors).some(error => error.status === true);

    return {errors, isValid};
}