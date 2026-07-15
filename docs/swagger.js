const swaggerJsdoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",

        info: {
            title: "Simple User API",
            version: "1.0.0",
            description:
                "RESTful API built with Express.js, PostgreSQL, JWT Authentication and Swagger."
        },

        servers: [
            {
                url: "http://localhost:3000",
                description: "Development Server"
            }
        ],

        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        },

        security: [
            {
                bearerAuth: []
            }
        ]
    },

    apis: ["./routes/*.js"]
};

module.exports = swaggerJsdoc(options);