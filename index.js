console.log("INDEX PATH:", __filename);

process.on("uncaughtException", (err) => {
    console.error(err);
});

process.on("unhandledRejection", (err) => {
    console.error(err);
});

require("dotenv").config();

console.log("Loading:", __filename);

const express = require("express");
const path = require("path");
const morgan = require("morgan");
const pool = require("./db");
const redisClient = require("./redisClient");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./docs/swagger");

const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");

const errorMiddleware = require("./middlewares/errorMiddleware");
const { helmet, cors, rateLimiter } = require("./middlewares/securityMiddleware");

const app = express();

// ==========================
// Middleware
// ==========================

app.use(helmet());
app.use(cors);
app.use(morgan("dev"));
app.use(rateLimiter);
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ==========================
// Routes
// ==========================

app.get("/", (req, res) => {
    res.send("Welcome to the Simple User API.");
});

app.get("/test", (req, res) => {
    res.send("API is working.");
});

app.get("/about", (req, res) => {
    res.send("RESTful API built with Node.js, Express.js and PostgreSQL.");
});

app.get("/dbtest", async (req, res) => {

    try {

        const result = await pool.query("SELECT NOW()");

        res.json(result.rows);

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }

});

// User Routes
app.use("/users", userRoutes);

// Authentication Routes
app.use("/auth", (req, res, next) => {
    console.log("AUTH HIT:", req.method, req.originalUrl);
    next();
});


app.use("/auth", authRoutes);

// 🔥 DEBUG
app.post("/auth/debug", (req, res) => {
    res.json({
        message: "Debug route works."
    });
});

// Swagger
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);

// ==========================
// Error Middleware
// ==========================

app.use(errorMiddleware);

// ==========================
// Server
// ==========================

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

console.log("Server object:", !!server);

setInterval(() => {
    console.log("Still alive...");
}, 5000);