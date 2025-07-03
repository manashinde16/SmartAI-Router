// utils/logPrompt.js
import sql from "./db.js";

export async function logPrompt({
  userId,
  modelUsed,
  prompt,
  response,
  tokenUsage,
  cost,
}) {
  try {
    await sql`
      INSERT INTO prompts (
        user_id, model_used, prompt, response, token_usage, cost
      ) VALUES (
        ${userId}, ${modelUsed}, ${prompt}, ${response}, ${tokenUsage}, ${cost}
      );
    `;

    await sql`
      INSERT INTO model_usage (
        model_name, usage_count, total_tokens, total_cost
      ) VALUES (
        ${modelUsed}, 1, ${tokenUsage}, ${cost}
      )
      ON CONFLICT (model_name)
      DO UPDATE SET
        usage_count = model_usage.usage_count + 1,
        total_tokens = model_usage.total_tokens + EXCLUDED.total_tokens,
        total_cost = model_usage.total_cost + EXCLUDED.total_cost;
    `;
  } catch (err) {
    console.error("Error logging prompt usage:", err);
  }
}
