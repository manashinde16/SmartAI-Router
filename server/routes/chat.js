const express = require("express");
const llmRouter = require("../services/llmRouter");
const { logPrompt } = require("../utils/logPrompt");
const { logFailure } = require("../utils/logFailure");
const { checkTokenCap, addTokensForToday } = require("../middleware/tokenCap");

const router = express.Router();

router.post("/", checkTokenCap, async (req, res) => {
  const prompt = req.body.prompt;
  const userId = req.body.userId || "anonymous";

  if (!prompt) return res.status(400).json({ error: "Prompt is required" });

  try {
    const resp = await llmRouter(prompt);

    if (!resp.success) {
      await logFailure({ modelName: "all", reason: resp.error, prompt });
      return res.status(502).json({ error: resp.error });
    }

    await logPrompt({
      userId,
      modelUsed: resp.model,
      prompt,
      response: resp.text,
      tokenUsage: resp.tokens,
      cost: resp.cost,
    });

    await addTokensForToday(userId, resp.tokens);

    return res.json({
      model: resp.model,
      response: resp.text,
      tokens: resp.tokens,
      cost: resp.cost,
    });
  } catch (err) {
    console.error("Router error:", err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
