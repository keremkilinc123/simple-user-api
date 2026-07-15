const request = require("supertest");
const express = require("express");

const app = express();

app.get("/test", (req, res) => {
    res.status(200).json({
        message: "API is working."
    });
});

describe("GET /test", () => {

    test("should return 200", async () => {

        const response = await request(app)
            .get("/test");

        expect(response.statusCode).toBe(200);

        expect(response.body.message)
            .toBe("API is working.");

    });

});