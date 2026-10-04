// tests/seed.test.js
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { openDatabase, migrate } from "../src/db.js";
import { seedIfEmpty } from "../src/seed.js";
import { listSchools, listUsers } from "../src/store.js";

let db;

beforeEach(() => {
  db = openDatabase(":memory:");
  migrate(db);
});

afterEach(() => {
  db.close();
});

describe("seedIfEmpty", () => {
  it("populates an empty DB and returns true", () => {
    const didSeed = seedIfEmpty(db);
    expect(didSeed).toBe(true);
    expect(listSchools(db)).toHaveLength(2);
    expect(listUsers(db).length).toBeGreaterThanOrEqual(7);
  });

  it("does nothing on a non-empty DB and returns false", () => {
    seedIfEmpty(db);
    const didSeedAgain = seedIfEmpty(db);
    expect(didSeedAgain).toBe(false);
    expect(listSchools(db)).toHaveLength(2);
  });
});
