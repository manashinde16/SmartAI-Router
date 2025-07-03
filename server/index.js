// server/index.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const { apiLimiter } = require("./middleware/rateLimiter");
const healthRouter = require("./routes/health");
const chatRouter = require("./routes/chat");

const app = express();
const PORT = process.env.PORT || 4000;

/* ---------- Global Middleware ---------- */
app.use(helmet());
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use("/api/", apiLimiter); // rate‑limit every /api/*

/* ---------- Routes ---------- */
app.use("/api/health", healthRouter);
app.use("/api/chat", chatRouter);

/* ---------- 404 Fallback ---------- */
app.use((req, res) => res.status(404).json({ error: "Route not found" }));

/* ---------- Error Handler ---------- */
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

/* ---------- Start Server ---------- */
app.listen(PORT, () => {
  console.log(`🚀  Server running on http://localhost:${PORT}`);
});
