const validateUserData = (
    username, email, password, confirmPassword
) => {

    const errors = {};

    if(username.trim() === '')
    {
        errors.username = "Username cannot be empty";
    }
    if(email.trim() === '')
    {
        errors.email = "Email cannot be empty";
    }
    else{
        emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if(!email.match(emailRegex))
        {
            errors.email = "Email entered is not valid";
        }
    }

    if(password === '')
    {
        errors.password = 'Password cannot be empty';
    }
    if(confirmPassword === '')
    {
        errors.confirmPassword = 'confirmPassword cannot be empty';
    }
    if(password !== confirmPassword)
    {
        errors.confirmPassword = "Passwords do not match";
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }

};

const validateUserLogin = (username, password) => {

    const errors = {}

     if(username.trim() === '')
    {
        errors.username = "Username cannot be empty";
    }
    if(password === '')
    {
        errors.password = 'Password cannot be empty';
    }

    return {
         errors,
        valid: Object.keys(errors).length < 1
    }

};

module.exports = {validateUserData, validateUserLogin};