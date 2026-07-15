const express = require("express");

const router = express.Router();

const authController = require("../controllers/authController");
console.log("authController =", Object.keys(authController));
const asyncHandler = require("../middlewares/asyncHandler");

const {
    registerValidation,
    loginValidation,
    validate
} = require("../validators/userValidator");

// ==========================
// Authentication Routes
// ==========================

// Register
router.post(
    "/register",
    registerValidation,
    validate,
    asyncHandler(authController.register)
);

// Login
router.post(
    "/login",
    loginValidation,
    validate,
    asyncHandler(authController.login)
);

// Refresh Token
router.post(
    "/refresh",
    asyncHandler(authController.refreshToken)
);

router.post(
    "/forgot-password",
    asyncHandler(authController.forgotPassword)
);

router.post(
    "/reset-password",
    asyncHandler(authController.resetPassword)
);

console.log("Auth routes loaded");
router.post("/test123", (req, res) => {
    res.json({ ok: true });
});
router.post("/abc", (req, res) => {
    res.json({ ok: true });
});
module.exports = router;