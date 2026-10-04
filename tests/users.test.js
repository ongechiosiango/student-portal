// tests/users.test.js
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import request from "supertest";
import { createApp } from "../src/server.js";
import { openDatabase, migrate } from "../src/db.js";
import { seedIfEmpty } from "../src/seed.js";

let db;
let app;

beforeEach(() => {
  db = openDatabase(":memory:");
  migrate(db);
  seedIfEmpty(db);
  app = createApp(db);
});

afterEach(() => {
  db.close();
});

describe("GET /schools", () => {
  it("returns the two seeded schools", async () => {
    const res = await request(app).get("/schools");
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2);
    expect(res.body.map((s) => s.name)).toEqual(["North High", "South High"]);
  });
});

describe("GET /users", () => {
  it("returns all seeded users", async () => {
    const res = await request(app).get("/users");
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThanOrEqual(7);
  });

  it("filters by school_id", async () => {
    const res = await request(app).get("/users?school_id=1");
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(4);
    expect(res.body.every((u) => u.school_id === 1)).toBe(true);
  });

  it("returns empty array for unknown school", async () => {
    const res = await request(app).get("/users?school_id=999");
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });
});

describe("GET /users/:id", () => {
  it("returns one user", async () => {
    const res = await request(app).get("/users/1");
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(1);
    expect(res.body.role).toBe("admin");
  });

  it("404s for unknown user", async () => {
    const res = await request(app).get("/users/999");
    expect(res.status).toBe(404);
    expect(res.body.error).toMatch(/not found/i);
  });
});
