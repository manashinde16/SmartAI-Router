// server/utils/logPrompt.js
const db = require("./db");

async function logPrompt({
  userId,
  modelUsed,
  prompt,
  response,
  tokenUsage,
  cost,
}) {
  try {
    await db.query(
      `INSERT INTO prompts (user_id, model_used, prompt, response, token_usage, cost)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [userId, modelUsed, prompt, response, tokenUsage, cost]
    );
  } catch (err) {
    console.error("Error logging prompt:", err);
  }
}

module.exports = { logPrompt };
