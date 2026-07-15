const pool = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const AppError = require("../utils/AppError");

// ==========================
// Register
// ==========================

async function register(data) {

    const { name, email, password, age } = data;

    const existingUser = await pool.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
    );

    if (existingUser.rows.length > 0) {

        throw new AppError(
            "Email is already registered.",
            409
        );

    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
        `INSERT INTO users (name, email, password, age, role)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING id, name, email, age, role`,
        [
            name,
            email,
            hashedPassword,
            age,
            "user"
        ]
    );

    return result.rows[0];

}

// ==========================
// Login
// ==========================

async function login(data) {

    const { email, password } = data;

    const result = await pool.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
    );

    const user = result.rows[0];

    if (!user) {

        throw new AppError(
            "Invalid email or password.",
            401
        );

    }

    const isMatch = await bcrypt.compare(
        password,
        user.password
    );

    if (!isMatch) {

        throw new AppError(
            "Invalid email or password.",
            401
        );

    }

    const accessToken = jwt.sign(
        {
            id: user.id,
            email: user.email,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN
        }
    );

    const refreshToken = jwt.sign(
        {
            id: user.id
        },
        process.env.JWT_REFRESH_SECRET,
        {
            expiresIn: process.env.JWT_REFRESH_EXPIRES_IN
        }
    );

    return {
        message: "Login successful.",
        accessToken,
        refreshToken
    };

}

// ==========================
// Refresh Token
// ==========================

async function refreshToken(token) {

    if (!token) {

        throw new AppError(
            "Refresh token is required.",
            401
        );

    }

    let decoded;

    try {

        decoded = jwt.verify(
            token,
            process.env.JWT_REFRESH_SECRET
        );

    } catch {

        throw new AppError(
            "Invalid refresh token.",
            401
        );

    }

    const result = await pool.query(
        "SELECT * FROM users WHERE id = $1",
        [decoded.id]
    );

    const user = result.rows[0];

    if (!user) {

        throw new AppError(
            "User not found.",
            404
        );

    }

    const accessToken = jwt.sign(
        {
            id: user.id,
            email: user.email,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN
        }
    );

    return {
        accessToken
    };

}


// ==========================
// Forgot Password
// ==========================

async function forgotPassword(email) {

    const result = await pool.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
    );

    const user = result.rows[0];

    if (!user) {
        throw new AppError(
            "User not found.",
            404
        );
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    const hashedToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    const expire = new Date(
        Date.now() + 15 * 60 * 1000
    );

    await pool.query(
        `UPDATE users
         SET reset_password_token = $1,
             reset_password_expire = $2
         WHERE id = $3`,
        [
            hashedToken,
            expire,
            user.id
        ]
    );

    return {
        message: "Reset link generated.",
        resetLink: `http://localhost:3000/auth/reset-password/${resetToken}`
    };

}

async function resetPassword(token, password) {

    const hashedToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");

    const result = await pool.query(
        `SELECT *
         FROM users
         WHERE reset_password_token = $1
         AND reset_password_expire > NOW()`,
        [hashedToken]
    );

    const user = result.rows[0];

    if (!user) {
        throw new AppError(
            "Invalid or expired reset token.",
            400
        );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
        `UPDATE users
         SET password = $1,
             reset_password_token = NULL,
             reset_password_expire = NULL
         WHERE id = $2`,
        [
            hashedPassword,
            user.id
        ]
    );

    return {
        message: "Password reset successful."
    };

}


module.exports = {
    register,
    login,
    refreshToken,
    forgotPassword,
    resetPassword
};