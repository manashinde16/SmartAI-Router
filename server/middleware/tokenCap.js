// server/middleware/tokenCap.js
const redis = require("../services/redisClient");

const DAILY_LIMIT = 20_000; // tokens

async function checkTokenCap(req, res, next) {
  const userId = req.headers["x-clerk-user-id"] || "anonymous";
  req.userId = userId;

  const dateKey = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const redisKey = `tok:${userId}:${dateKey}`;

  const used = parseInt((await redis.get(redisKey)) || "0", 10);
  if (used >= DAILY_LIMIT) {
    return res.status(429).json({ error: "Daily token quota exceeded." });
  }
  req.tokensUsedToday = used;
  next();
}

async function addTokensForToday(userId, tokens) {
  const dateKey = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const redisKey = `tok:${userId}:${dateKey}`;
  await redis.incrBy(redisKey, tokens);
  await redis.expire(redisKey, 60 * 60 * 24 * 2); // 48 h TTL
}

module.exports = { checkTokenCap, addTokensForToday };
