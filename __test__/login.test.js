const app = require("../app");
const testReq = require("supertest");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });
const jwt = require("jsonwebtoken");
const { DB_HOST, JWT_SECRET } = process.env;

describe("login", () => {
  beforeAll(async () => {
    await mongoose
      .connect(DB_HOST)
      .then(() => console.log("Database connection successful"))
      .catch((error) => {
        console.log(error.message);
      });
  });
  afterAll(async () => {
    await mongoose
      .disconnect(DB_HOST)
      .then(() => console.log("Database disconnection successful"))
      .catch((error) => {
        console.log(error.message);
      });
  });

  it("Should login user", async () => {
    const res = await testReq(app).post("/users/login").send({
      email: "test1@mail.com",
      password: "123456",
    });

    const { token, user } = res.body;
    const userKey = Object.keys(user);
    const isToken = jwt.verify(token, JWT_SECRET);

    expect(res.statusCode).toBe(200);

    expect(res.body).toEqual(
      expect.objectContaining({
        token: expect.any(String),
        user: expect.objectContaining({
          email: expect.any(String),
          subscription: expect.any(String),
        }),
      })
    );

    expect(isToken).toBeTruthy();
    expect(userKey).toHaveLength(2);
  });
});
