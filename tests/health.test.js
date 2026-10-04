// tests/health.test.js
import { describe, it, expect } from "vitest";
import request from "supertest";
import { createApp } from "../src/server.js";

describe("GET /health", () => {
  it("returns 200 with status ok", async () => {
    const app = createApp();
    const res = await request(app).get("/health");

    expect(res.status).toBe(200);
    expect(res.body.status).toBe("ok");
    expect(typeof res.body.version).toBe("string");
  });

  it("returns JSON content type", async () => {
    const app = createApp();
    const res = await request(app).get("/health");

    expect(res.headers["content-type"]).toMatch(/application\/json/);
  });
});
