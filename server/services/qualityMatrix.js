// qualityMatrix.js  — scores 0‑10 for each prompt type
module.exports = {
  openai: { code: 10, qa: 10, creative: 9 },
  claude: { code: 7, qa: 8, creative: 10 },
  gemini: { code: 8, qa: 9, creative: 8 },
  cohere: { code: 6, qa: 7, creative: 7 },
  huggingface: { code: 3, qa: 5, creative: 6 },
  stability: { code: 5, qa: 4, creative: 7 },
  replicate: { code: 5, qa: 5, creative: 8 },
  openrouter: { code: 7, qa: 8, creative: 8 },
  togetherai: { code: 6, qa: 7, creative: 7 },
};
