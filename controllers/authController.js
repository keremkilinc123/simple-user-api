
const authService = require("../services/authService");

// ==========================
// Register
// ==========================

async function register(req, res) {

    const result = await authService.register(req.body);

    res.status(201).json(result);

}

// ==========================
// Login
// ==========================

async function login(req, res) {

    const result = await authService.login(req.body);

    res.status(200).json(result);

}

// ==========================
// Refresh Token
// ==========================

async function refreshToken(req, res) {

    const { refreshToken } = req.body;

    const result = await authService.refreshToken(refreshToken);

    res.status(200).json(result);

}


// ==========================
// Forgot Password
// ==========================

async function forgotPassword(req, res) {

    const { email } = req.body;

    const result = await authService.forgotPassword(email);

    res.status(200).json(result);

}

// ==========================
// Reset Password
// ==========================

async function resetPassword(req, res) {

    const { token, password } = req.body;

    const result = await authService.resetPassword(
        token,
        password
    );

    res.status(200).json(result);

}

module.exports = {
    register,
    login,
    refreshToken,
    forgotPassword,
    resetPassword
};