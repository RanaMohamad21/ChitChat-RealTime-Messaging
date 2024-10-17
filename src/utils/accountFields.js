function errorHandler(err) {
    let errors = { email: "", password: "", userName: "" };

    // incorrect email
    if (err.message === "incorrect email") {
        errors.email = "That email is not registered.";
    }

    // incorrect password
    if (err.message === "incorrect password") {
        errors.password = "Incorrect password.";
    }

    // Duplicate email error
    if (err.code === 11000) {
        errors.email = "That email is already registered.";
        return errors;
    }

    // Validation errors
    if (err.message.includes("User validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }

    return errors;
}

module.exports = errorHandler