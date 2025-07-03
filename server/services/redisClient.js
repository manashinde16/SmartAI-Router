// services/redisClient.js
const { createClient } = require("redis");

const client = createClient({
  url: process.env.REDIS_URL, // redis://default:password@host:port
});

client.on("error", (err) => console.error("Redis Error:", err));

// connect in the background; no top‑level await
client.connect().catch((err) => {
  console.error("Redis connect error:", err);
});

module.exports = client;
