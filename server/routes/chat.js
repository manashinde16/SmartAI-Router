// server/routes/chat.js  (CommonJS)
const express = require("express");
const router = express.Router();

const llmRouter = require("../services/llmRouter");
const { logPrompt } = require("../utils/logPrompt");
const { logFailure } = require("../utils/logFailure");
const { getUserUsage, updateUserUsage } = require("../utils/usageHelpers");

const { checkTokenCap, addTokensForToday } = require("../middleware/tokenCap");
const { DAILY_COST_LIMIT, DAILY_TOKEN_LIMIT } = require("../config/constants");

// POST /api/chat
router.post("/", checkTokenCap, async (req, res) => {
  const { prompt, userId = "anonymous" } = req.body;
  if (!prompt) return res.status(400).json({ error: "Prompt is required" });

  /* ---- 1. Check Neon daily cost/token limits ---- */
  try {
    const usage = await getUserUsage(userId);
    if (
      usage.total_tokens >= DAILY_TOKEN_LIMIT ||
      usage.total_cost >= DAILY_COST_LIMIT
    ) {
      return res.status(403).json({ error: "Daily usage limit reached" });
    }
  } catch (err) {
    console.error("DB usage read error:", err);
    return res.status(500).json({ error: "Usage check failed" });
  }

  /* ---- 2. Route prompt through cheapest/best AI ---- */
  try {
    const resp = await llmRouter(prompt);

    if (!resp.success) {
      await logFailure({ modelName: "all", reason: resp.error, prompt });
      return res.status(502).json({ error: resp.error });
    }

    /* ---- 3. Log prompt + update usage ---- */
    await logPrompt({
      userId,
      modelUsed: resp.provider, // resp.provider from llmRouter
      prompt,
      response: resp.data,
      tokenUsage: resp.tokens || 0,
      cost: resp.cost || 0,
    });

    await updateUserUsage(
      userId,
      resp.provider,
      resp.tokens || 0,
      resp.cost || 0
    );
    await addTokensForToday(userId, resp.tokens || 0); // Redis tally

    return res.json({
      model: resp.provider,
      response: resp.data,
      tokens: resp.tokens,
      cost: resp.cost,
    });
  } catch (err) {
    console.error("Router error:", err.message);
    await logFailure({ modelName: "unknown", reason: err.message, prompt });
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
