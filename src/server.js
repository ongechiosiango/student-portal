// src/server.js
import express from "express";
import { listSchools, listUsers, getUser } from "./store.js";

/**
 * Create the Express app.
 * Takes an open SQLite db so tests can inject an in-memory one.
 */
export function createApp(db) {
  const app = express();

  app.use(express.json());

  app.get("/health", (req, res) => {
    res.json({ status: "ok", version: "0.1.0" });
  });

  app.get("/schools", (req, res) => {
    res.json(listSchools(db));
  });

  app.get("/users", (req, res) => {
    const schoolId = req.query.school_id ? Number(req.query.school_id) : undefined;
    res.json(listUsers(db, { schoolId }));
  });

  app.get("/users/:id", (req, res) => {
    const user = getUser(db, Number(req.params.id));
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  });

  return app;
}
