// utils/logFailure.js
import sql from "./db.js";

export async function logFailure({ modelName, reason, prompt }) {
  try {
    await sql`
      INSERT INTO failures (model_name, reason, prompt)
      VALUES (${modelName}, ${reason}, ${prompt});
    `;
  } catch (err) {
    console.error("Error logging failure:", err);
  }
}
