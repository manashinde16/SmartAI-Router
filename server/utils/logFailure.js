// server/utils/logFailure.js
const db = require("./db");

async function logFailure({ modelName, reason, prompt }) {
  try {
    await db.query(
      `INSERT INTO failures (model_name, reason, prompt)
       VALUES ($1, $2, $3)`,
      [modelName, reason, prompt]
    );
  } catch (err) {
    console.error("Error logging failure:", err);
  }
}

module.exports = { logFailure };
