const { Pool } = require("pg");

const pool = new Pool({
    user: "kerem",
    host: "localhost",
    database: "backenddb",
    password: "123456",
    port: 5432,
});

module.exports = pool;