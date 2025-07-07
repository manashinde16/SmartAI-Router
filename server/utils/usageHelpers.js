// server/utils/usageHelpers.js
const db = require("./db");

async function getUserUsage(userId) {
  const { rows } = await db.query(
    `SELECT total_tokens, total_cost
       FROM model_usage
      WHERE user_id = $1  AND date = CURRENT_DATE`,
    [userId]
  );
  if (rows.length === 0) return { total_tokens: 0, total_cost: 0 };
  return rows[0];
}

async function updateUserUsage(userId, model, tokens, cost) {
  await db.query(
    `INSERT INTO model_usage (user_id, model, total_tokens, total_cost)
         VALUES ($1, $2, $3, $4)
     ON CONFLICT (user_id, date)
       DO UPDATE SET
         total_tokens = model_usage.total_tokens + EXCLUDED.total_tokens,
         total_cost   = model_usage.total_cost   + EXCLUDED.total_cost,
         updated_at   = NOW()`,
    [userId, model, tokens, cost]
  );
}

module.exports = { getUserUsage, updateUserUsage };
