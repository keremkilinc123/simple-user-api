const pool = require("../db");

async function getUsers() {

    const result = await pool.query(
        "SELECT * FROM users ORDER BY id"
    );

    return result.rows;

}

async function getUserById(id) {

    const result = await pool.query(
        "SELECT * FROM users WHERE id = $1",
        [id]
    );

    return result.rows[0];

}

async function createUser(name, age) {

    const result = await pool.query(
        "INSERT INTO users (name, age) VALUES ($1, $2) RETURNING *",
        [name, age]
    );

    return result.rows[0];

}

async function updateUser(id, name, age) {

    const result = await pool.query(
        `UPDATE users
         SET name = $1,
             age = $2
         WHERE id = $3
         RETURNING *`,
        [name, age, id]
    );

    return result.rows[0];

}

async function deleteUser(id) {

    const result = await pool.query(
        "DELETE FROM users WHERE id = $1 RETURNING *",
        [id]
    );

    return result.rows[0];

}

// ==========================
// PROFILE
// ==========================

async function getProfile(id) {

    const result = await pool.query(
        `SELECT
            id,
            name,
            email,
            age,
            role
         FROM users
         WHERE id = $1`,
        [id]
    );

    return result.rows[0];

}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    getProfile
};