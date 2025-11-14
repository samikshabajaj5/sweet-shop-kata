import request from "supertest";
import app from "../app";
import db from "../utils/db";

beforeAll(async () => {
  // reset DB for TDD
  await db.sync({ force: true });
});

afterAll(async () => {
  // Close connection (SQLite is fine but keep consistent)
  await db.close();
});

/**
 * Helper: register + login to get JWT token
 */
async function getAuthToken(
  email = "user@example.com",
  password = "password123",
) {
  // register
  await request(app).post("/api/auth/register").send({
    name: "Test User",
    email,
    password,
  });

  // login
  const loginRes = await request(app).post("/api/auth/login").send({
    email,
    password,
  });

  return loginRes.body.token;
}

describe("Sweets API (RED) - failing tests until implementation", () => {
  let token: string;

  beforeAll(async () => {
    token = await getAuthToken();
  });

  it("POST /api/sweets should create a new sweet (protected)", async () => {
    const res = await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Chocolate Truffle",
        category: "Chocolate",
        price: 2.5,
        quantity: 10,
      });

    // Expect 201 Created (will fail until endpoint implemented)
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body).toMatchObject({
      name: "Chocolate Truffle",
      category: "Chocolate",
      price: 2.5,
      quantity: 10,
    });
  });

  it("GET /api/sweets should return list of sweets", async () => {
    const res = await request(app)
      .get("/api/sweets")
      .set("Authorization", `Bearer ${token}`);

    // Expect 200 and an array (will fail until implemented)
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    // At least one sweet (created above)
    expect(res.body.length).toBeGreaterThanOrEqual(1);
  });

  it("GET /api/sweets/search should filter sweets by name, category and price range", async () => {
    // create another sweet to test search
    await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Lemon Tart",
        category: "Tart",
        price: 3.0,
        quantity: 5,
      });

    const resByName = await request(app)
      .get("/api/sweets/search")
      .query({ name: "Lemon" })
      .set("Authorization", `Bearer ${token}`);

    expect(resByName.status).toBe(200);
    expect(Array.isArray(resByName.body)).toBe(true);
    expect(resByName.body.some((s: any) => /Lemon/i.test(s.name))).toBe(true);

    const resByCategory = await request(app)
      .get("/api/sweets/search")
      .query({ category: "Chocolate" })
      .set("Authorization", `Bearer ${token}`);

    expect(resByCategory.status).toBe(200);
    expect(
      resByCategory.body.every((s: any) => s.category === "Chocolate"),
    ).toBe(true);

    const resByPriceRange = await request(app)
      .get("/api/sweets/search")
      .query({ minPrice: 2.0, maxPrice: 3.0 })
      .set("Authorization", `Bearer ${token}`);

    expect(resByPriceRange.status).toBe(200);
    expect(
      resByPriceRange.body.every((s: any) => s.price >= 2.0 && s.price <= 3.0),
    ).toBe(true);
  });

  it("PUT /api/sweets/:id should update a sweet", async () => {
    // get sweets list to pick an id
    const listRes = await request(app)
      .get("/api/sweets")
      .set("Authorization", `Bearer ${token}`);

    const sweets = listRes.body;
    expect(Array.isArray(sweets)).toBe(true);
    const sweetId = sweets[0]?.id;
    expect(sweetId).toBeDefined();

    const updateRes = await request(app)
      .put(`/api/sweets/${sweetId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ price: 4.5, quantity: 20 });

    expect(updateRes.status).toBe(200);
    expect(updateRes.body).toMatchObject({
      id: sweetId,
      price: 4.5,
      quantity: 20,
    });
  });

  it("DELETE /api/sweets/:id should return 403 for non-admin user", async () => {
    // get sweets list to pick an id
    const listRes = await request(app)
      .get("/api/sweets")
      .set("Authorization", `Bearer ${token}`);

    const sweets = listRes.body;
    const sweetId = sweets[0]?.id;
    expect(sweetId).toBeDefined();

    const delRes = await request(app)
      .delete(`/api/sweets/${sweetId}`)
      .set("Authorization", `Bearer ${token}`);

    // We expect forbidden for non-admin (implementation will enforce roles later)
    expect(delRes.status).toBe(403);
  });
});
