// tests/health.test.js
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import request from "supertest";
import { createApp } from "../src/server.js";
import { openDatabase, migrate } from "../src/db.js";

let db;
let app;

beforeEach(() => {
  db = openDatabase(":memory:");
  migrate(db);
  app = createApp(db);
});

afterEach(() => {
  db.close();
});

describe("GET /health", () => {
  it("returns 200 with status ok", async () => {
    const res = await request(app).get("/health");

    expect(res.status).toBe(200);
    expect(res.body.status).toBe("ok");
    expect(typeof res.body.version).toBe("string");
  });

  it("returns JSON content type", async () => {
    const res = await request(app).get("/health");

    expect(res.headers["content-type"]).toMatch(/application\/json/);
  });
});
