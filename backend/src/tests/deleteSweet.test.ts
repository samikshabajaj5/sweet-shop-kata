import request from "supertest";
import app from "../app";
import db from "../utils/db";

beforeAll(async () => {
  await db.sync({ force: true });
});

// Do not close DB for SQLite
afterAll(async () => {});

async function createUserAndLogin(email: string, role: "user" | "admin") {
  await request(app).post("/api/auth/register").send({
    name: "TestUser",
    email,
    password: "password123",
    role,
  });

  const login = await request(app).post("/api/auth/login").send({
    email,
    password: "password123",
  });

  return login.body.token;
}

describe("DELETE /api/sweets/:id (RED)", () => {
  let userToken: string;
  let adminToken: string;
  let sweetId: number;

  beforeAll(async () => {
    // Create user + admin
    userToken = await createUserAndLogin("user@example.com", "user");
    adminToken = await createUserAndLogin("admin@example.com", "admin");

    // Create a sweet
    const res = await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${userToken}`)
      .send({
        name: "Gummy Bear",
        category: "Candy",
        price: 1.5,
        quantity: 8,
      });

    sweetId = res.body.id;
  });

  it("should return 403 for non-admin user", async () => {
    const res = await request(app)
      .delete(`/api/sweets/${sweetId}`)
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.status).toBe(403);
  });

  it("should delete sweet for admin user", async () => {
    const res = await request(app)
      .delete(`/api/sweets/${sweetId}`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Sweet deleted");
  });

  it("should return 404 when deleting non-existing sweet", async () => {
    const res = await request(app)
      .delete(`/api/sweets/99999`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.status).toBe(404);
    expect(res.body.error).toBe("Sweet not found");
  });
});
