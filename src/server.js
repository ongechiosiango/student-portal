// src/server.js
import express from "express";

/**
 * Create the Express app.
 * Kept as a factory so tests can import it without starting a listener.
 */
export function createApp() {
  const app = express();

  app.use(express.json());

  app.get("/health", (req, res) => {
    res.json({ status: "ok", version: "0.1.0" });
  });

  return app;
}
