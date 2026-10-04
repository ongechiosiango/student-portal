// src/seed.js
/**
 * Insert demo data if the database is empty.
 * Idempotent: safe to call on every startup.
 */
export function seedIfEmpty(db) {
  const count = db.prepare("SELECT COUNT(*) AS n FROM schools").get().n;
  if (count > 0) return false;

  const insertSchool = db.prepare("INSERT INTO schools (name) VALUES (?)");
  const insertUser = db.prepare(`
    INSERT INTO users (school_id, role, name, email)
    VALUES (?, ?, ?, ?)
  `);

  const tx = db.transaction(() => {
    const northId = insertSchool.run("North High").lastInsertRowid;
    const southId = insertSchool.run("South High").lastInsertRowid;

    insertUser.run(northId, "admin",   "Ada Admin",    "ada@north.example");
    insertUser.run(northId, "teacher", "Tom Teacher",  "tom@north.example");
    insertUser.run(northId, "student", "Sara Student", "sara@north.example");
    insertUser.run(northId, "parent",  "Pat Parent",   "pat@north.example");

    insertUser.run(southId, "admin",   "Al Admin",     "al@south.example");
    insertUser.run(southId, "teacher", "Tina Teacher", "tina@south.example");
    insertUser.run(southId, "student", "Sam Student",  "sam@south.example");
  });

  tx();
  return true;
}
