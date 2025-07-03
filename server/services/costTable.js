// costTable.js  — approx. cost per‑1K tokens in USD (adjust anytime)
require("dotenv").config();

module.exports = [
  { name: "huggingface", cost: 0.001, key: process.env.HF_API_KEY },
  { name: "cohere", cost: 0.002, key: process.env.COHERE_API_KEY },
  { name: "stability", cost: 0.003, key: process.env.STABILITY_API_KEY },
  { name: "replicate", cost: 0.004, key: process.env.REPLICATE_API_KEY },
  { name: "togetherai", cost: 0.005, key: process.env.TOGETHER_API_KEY },
  { name: "openrouter", cost: 0.006, key: process.env.OPENROUTER_API_KEY },
  { name: "gemini", cost: 0.007, key: process.env.GEMINI_API_KEY },
  { name: "claude", cost: 0.008, key: process.env.CLAUDE_API_KEY },
  { name: "openai", cost: 0.01, key: process.env.OPENAI_API_KEY },
];
