import request from "supertest";
import app from "../app";
import { describe, it } from "node:test";

describe("API Health Check", () => {
  it("should return healthy message", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Sweet Shop API is running");
  });
});
