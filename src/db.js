// src/db.js
import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";

/**
 * Open (or create) the SQLite database.
 *
 * Pass ":memory:" for an in-memory DB (used in tests).
 * Otherwise the DB file lives at data/portal.db by default.
 */
export function openDatabase(filePath) {
  const target = filePath || process.env.DB_PATH || "data/portal.db";

  if (target !== ":memory:") {
    fs.mkdirSync(path.dirname(target), { recursive: true });
  }

  const db = new Database(target);
  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");
  return db;
}

/**
 * Create tables if they don't exist yet.
 * Safe to call on every startup.
 */
export function migrate(db) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS schools (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      name       TEXT NOT NULL UNIQUE
    );

    CREATE TABLE IF NOT EXISTS users (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      school_id  INTEGER NOT NULL,
      role       TEXT NOT NULL CHECK (role IN ('student','teacher','admin','parent')),
      name       TEXT NOT NULL,
      email      TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      UNIQUE (school_id, email),
      FOREIGN KEY (school_id) REFERENCES schools(id) ON DELETE CASCADE
    );
  `);
}
