// src/index.js
import { createApp } from "./server.js";
import { openDatabase, migrate } from "./db.js";
import { seedIfEmpty } from "./seed.js";

const PORT = Number(process.env.PORT || 3000);

const db = openDatabase();
migrate(db);

const seeded = seedIfEmpty(db);
if (seeded) {
  console.log("Seeded demo data into the database.");
}

const app = createApp(db);

app.listen(PORT, () => {
  console.log(`student-portal listening on http://localhost:${PORT}`);
});
