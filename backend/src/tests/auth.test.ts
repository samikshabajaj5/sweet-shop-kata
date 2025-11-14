import request from "supertest";
import app from "../app";
import db from "../utils/db";

beforeAll(async () => {
  await db.sync({ force: true }); // reset tables
});

afterAll(async () => {
  // no need to close when using sqllite
  //   await db.close();
});

describe("Authentication", () => {
  it("should register a user", async () => {
    const res = await request(app).post("/api/v1/auth/register").send({
      name: "Test User",
      email: "test@example.com",
      password: "password123",
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("message", "User registered successfully");
  });

  it("should login a user and return token", async () => {
    const res = await request(app).post("/api/v1/auth/login").send({
      email: "test@example.com",
      password: "password123",
    });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
  });
});
