// middleware/tokenCap.js
const redisClient = require("../services/redisClient");

const TOKEN_LIMIT = 100_000; // daily per‑user limit
const DAY_KEY_PREFIX = "tok";

// Helper: tok:<userId>:<yyyyMMdd>
function getTodayKey(userId) {
  const date = new Date().toISOString().split("T")[0].replace(/-/g, "");
  return `${DAY_KEY_PREFIX}:${userId}:${date}`;
}

async function checkTokenCap(req, res, next) {
  const userId = req.body.userId || "anonymous";
  req.userId = userId; // pass along

  try {
    const key = getTodayKey(userId);
    const used = parseInt((await redisClient.get(key)) || "0", 10);

    if (used >= TOKEN_LIMIT) {
      return res.status(429).json({ error: "Daily token limit reached." });
    }

    next();
  } catch (err) {
    console.error("Redis read error:", err);
    return res.status(500).json({ error: "Redis error" });
  }
}

async function addTokensForToday(userId, count) {
  const key = getTodayKey(userId);

  await redisClient.incrBy(key, count);

  // ensure key expires after 24 h
  const ttl = await redisClient.ttl(key);
  if (ttl === -1) {
    await redisClient.expire(key, 60 * 60 * 24);
  }
}

module.exports = { checkTokenCap, addTokensForToday };
