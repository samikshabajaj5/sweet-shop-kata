import request from "supertest";
import app from "../app";
import db from "../utils/db";

beforeAll(async () => {
  await db.sync({ force: true });
});

afterAll(async () => {
  // Do not close DB for SQLite
});

/**
 * Helper to register & login as normal user
 */
async function getUserToken() {
  await request(app).post("/api/auth/register").send({
    name: "User One",
    email: "user1@example.com",
    password: "password123",
  });

  const login = await request(app).post("/api/auth/login").send({
    email: "user1@example.com",
    password: "password123",
  });

  return login.body.token;
}

/**
 * Helper to register & login as admin
 * (We will fake admin using JWT payload modification for now)
 */
async function getAdminToken() {
  // Register admin with explicit role
  await request(app).post("/api/auth/register").send({
    name: "Admin",
    email: "admin@example.com",
    password: "password123",
    role: "admin", // NEW → required for adminMiddleware
  });

  const login = await request(app).post("/api/auth/login").send({
    email: "admin@example.com",
    password: "password123",
  });

  return login.body.token;
}

describe("Inventory API (RED)", () => {
  let userToken: string;
  let adminToken: string;
  let sweetId: number;

  beforeAll(async () => {
    userToken = await getUserToken();
    adminToken = await getAdminToken();

    // create initial sweet
    const res = await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${userToken}`)
      .send({
        name: "Vanilla Cupcake",
        category: "Cupcake",
        price: 2.0,
        quantity: 5,
      });

    sweetId = res.body.id;
  });

  it("POST /api/sweets/:id/purchase should decrease quantity", async () => {
    const res = await request(app)
      .post(`/api/sweets/${sweetId}/purchase`)
      .set("Authorization", `Bearer ${userToken}`)
      .send();

    expect(res.status).toBe(200);
    expect(res.body.quantity).toBe(4); // 5 → 4
  });

  it("POST /api/sweets/:id/purchase should fail if quantity is zero", async () => {
    // Reduce quantity to 0
    await request(app)
      .put(`/api/sweets/${sweetId}`)
      .set("Authorization", `Bearer ${userToken}`)
      .send({ quantity: 0 });

    const res = await request(app)
      .post(`/api/sweets/${sweetId}/purchase`)
      .set("Authorization", `Bearer ${userToken}`)
      .send();

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Out of stock");
  });

  it("POST /api/sweets/:id/restock should increase quantity (admin only)", async () => {
    const res = await request(app)
      .post(`/api/sweets/${sweetId}/restock`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ amount: 10 });

    expect(res.status).toBe(200);
    expect(res.body.quantity).toBe(10); // previously 0
  });

  it("POST /api/sweets/:id/restock should return 403 for normal users", async () => {
    const res = await request(app)
      .post(`/api/sweets/${sweetId}/restock`)
      .set("Authorization", `Bearer ${userToken}`)
      .send({ amount: 5 });

    expect(res.status).toBe(403);
  });
});
