require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const healthRouter = require("./routes/health");

const app = express();
const PORT = process.env.PORT || 4000;

/* ---------- Global Middleware ---------- */
app.use(helmet()); // secure HTTP headers
app.use(cors({ origin: "*" })); // relax later to Vercel domain
app.use(express.json()); // parse JSON bodies

/* ---------- Routes ---------- */
app.use("/api/health", healthRouter);

/* ---------- 404 Fallback ---------- */
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

/* ---------- Global Error Handler ---------- */
app.use((err, _req, res, _next) => {
  console.error(err); // log stack trace
  res.status(500).json({ error: "Internal server error" });
});

/* ---------- Start Server ---------- */
app.listen(PORT, () => {
  console.log(`🚀  Server running on http://localhost:${PORT}`);
});
