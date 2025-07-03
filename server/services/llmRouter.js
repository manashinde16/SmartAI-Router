const costTable = require("./costTable");
const qualityMatrix = require("./qualityMatrix");
const classifyPrompt = require("./promptClassifier");

// providerFns must export { fn, estimateTokens }  (you already have wrappers)
const providerFns = {
  openai: require("./providers/openai"),
  claude: require("./providers/anthropicClaude"),
  gemini: require("./providers/googleGemini"),
  cohere: require("./providers/cohere"),
  huggingface: require("./providers/huggingFace"),
  stability: require("./providers/stabilityAI"),
  replicate: require("./providers/replicate"),
  openrouter: require("./providers/openRouter"),
  togetherai: require("./providers/togetherAI"),
};

const SPEED_TIMEOUT = 10_000; // 10 s max per provider

async function llmRouter(prompt) {
  const promptType = classifyPrompt(prompt);

  // Score: 70 % quality, 30 % (inverse) cost
  const ranked = costTable
    .filter((p) => p.key) // has API key
    .map((p) => {
      const qScore = qualityMatrix[p.name][promptType] || 5;
      const cScore = 1 - p.cost; // cheaper → higher
      return { ...p, score: 0.7 * qScore + 0.3 * cScore };
    })
    .sort((a, b) => b.score - a.score);

  // try in order; Promise.race each call vs timeout
  for (const p of ranked) {
    const fn = providerFns[p.name];
    if (!fn) continue;

    try {
      const result = await Promise.race([
        fn(prompt, p.key),
        new Promise((_, rej) =>
          setTimeout(() => rej(new Error("timeout")), SPEED_TIMEOUT)
        ),
      ]);

      if (result.success) {
        return {
          success: true,
          model: p.name,
          text: result.data,
          tokens: result.tokens || 0,
          cost:
            result.cost ||
            (result.tokens ? ((result.tokens / 1000) * p.cost).toFixed(6) : 0),
        };
      }
    } catch (_) {
      // just continue to next provider
    }
  }
  return { success: false, error: "All providers failed." };
}

module.exports = llmRouter;
