// src/index.js
import { createApp } from "./server.js";

const PORT = Number(process.env.PORT || 3000);

const app = createApp();

app.listen(PORT, () => {
  console.log(`student-portal listening on http://localhost:${PORT}`);
});
