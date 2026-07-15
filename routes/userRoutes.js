const express = require("express");

const router = express.Router();

const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/authorize");
const asyncHandler = require("../middlewares/asyncHandler");
const upload = require("../middlewares/uploadMiddleware");

/**
 * @swagger
 * /users/profile:
 *   get:
 *     summary: Get current user profile
 *     description: Returns the authenticated user's profile.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile
 *       401:
 *         description: Unauthorized
 */
router.get(
    "/profile",
    authMiddleware,
    asyncHandler(userController.getProfile)
);

// ==========================
// User Routes
// ==========================

// Get all users
router.get(
    "/",
    asyncHandler(userController.getUsers)
);

// Create a user
router.post(
    "/",
    asyncHandler(userController.createUser)
);

// Upload image
router.post(
    "/upload",
    upload.single("image"),
    asyncHandler(userController.uploadImage)
);

// Get user by ID
router.get(
    "/:id",
    asyncHandler(userController.getUserById)
);

// Update user
router.put(
    "/:id",
    asyncHandler(userController.updateUser)
);

// Delete user (Admin only)
router.delete(
    "/:id",
    authMiddleware,
    authorize("admin"),
    asyncHandler(userController.deleteUser)
);

module.exports = router;