const userService = require("../services/userService");
const redisClient = require("../redisClient");

async function getUsers(req, res) {

    try {

        const cachedUsers = await redisClient.get("users");

        if (cachedUsers) {

            console.log("✅ Cache HIT");

            return res.json(JSON.parse(cachedUsers));

        }

        console.log("❌ Cache MISS");

        const users = await userService.getUsers();

        await redisClient.setEx(
            "users",
            60,
            JSON.stringify(users)
        );

        res.json(users);

    } catch (err) {

        console.error(err);

        res.status(500).json({
            error: err.message
        });

    }

}

async function getUserById(req, res) {

    try {

        const id = Number(req.params.id);

        const user = await userService.getUserById(id);

        if (!user) {

            return res.status(404).json({
                message: "User not found."
            });

        }

        res.json(user);

    } catch (err) {

        console.error("ERROR:");
        console.error(err);

        res.status(500).json({
            error: err.message,
            stack: err.stack
        });

    }

}

async function createUser(req, res) {

    try {

        const { name, age } = req.body;

        const user = await userService.createUser(name, age);

        res.status(201).json(user);

    } catch (err) {

        console.error("ERROR:");
        console.error(err);

        res.status(500).json({
            error: err.message,
            stack: err.stack
        });

    }

}

async function updateUser(req, res) {

    try {

        const id = Number(req.params.id);
        const { name, age } = req.body;

        const user = await userService.updateUser(id, name, age);

        if (!user) {

            return res.status(404).json({
                message: "User not found."
            });

        }

        res.json(user);

    } catch (err) {

        console.error("ERROR:");
        console.error(err);

        res.status(500).json({
            error: err.message,
            stack: err.stack
        });

    }

}

async function deleteUser(req, res) {

    try {

        const id = Number(req.params.id);

        const user = await userService.deleteUser(id);

        if (!user) {

            return res.status(404).json({
                message: "User could not be deleted."
            });

        }

        res.json({
            message: "User deleted successfully.",
            user
        });

    } catch (err) {

        console.error("ERROR:");
        console.error(err);

        res.status(500).json({
            error: err.message,
            stack: err.stack
        });

    }

}

// ==========================
// PROFILE
// ==========================

async function uploadImage(req, res) {

    if (!req.file) {
        return res.status(400).json({
            message: "No image file provided."
        });
    }

    res.status(201).json({
        message: "Image uploaded successfully",
        filename: req.file.filename
    });

}

async function getProfile(req, res) {

    try {

        const user = await userService.getProfile(req.user.id);

        if (!user) {

            return res.status(404).json({
                message: "User not found."
            });

        }

        res.status(200).json(user);

    } catch (err) {

        console.error("ERROR:");
        console.error(err);

        res.status(500).json({
            error: err.message
        });

    }

}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    uploadImage,
    getProfile
};