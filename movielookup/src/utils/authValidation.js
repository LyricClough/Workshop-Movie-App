export function validateUsername(username) {
    const name = username.trim();

    if (!name) {
        throw new Error('Please enter a username.');
    }

    if (!/^[A-Za-z0-9_]{5,14}$/.test(name)) {
        throw new Error(
            'Username must be 5-14 characters and can only contain letters, numbers, and underscores.'
        );
    }

    return name;
}

export function validatePassword(password, confirmPassword) {
    if (password !== confirmPassword) {
        throw new Error('Passwords do not match.');
    }

    if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test(password)) {
        throw new Error(
            'Password must be at least 8 characters and include at least one capital letter, one number, and one special character.'
        );
    }

    return password;
}

export function validateRegistration({ username, password, confirmPassword }) {
    const cleanUsername = validateUsername(username);
    validatePassword(password, confirmPassword);

    return {
        username: cleanUsername,
        password,
    };
}