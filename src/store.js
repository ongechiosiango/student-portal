// src/store.js
/**
 * Data access layer.
 * All functions take an open SQLite db as their first argument.
 */

export function listSchools(db) {
  return db.prepare("SELECT id, name FROM schools ORDER BY id").all();
}

export function listUsers(db, { schoolId } = {}) {
  if (schoolId != null) {
    return db
      .prepare(
        "SELECT id, school_id, role, name, email, created_at FROM users WHERE school_id = ? ORDER BY id"
      )
      .all(schoolId);
  }
  return db
    .prepare(
      "SELECT id, school_id, role, name, email, created_at FROM users ORDER BY id"
    )
    .all();
}

export function getUser(db, id) {
  return db
    .prepare(
      "SELECT id, school_id, role, name, email, created_at FROM users WHERE id = ?"
    )
    .get(id);
}
