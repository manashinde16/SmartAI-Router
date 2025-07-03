// stabilityAI.js  (text‑to‑text)
const axios = require("axios");
module.exports = async (prompt, apiKey) => {
  try {
    const { data } = await axios.post(
      "https://api.stability.ai/v1/generation/text-to-text",
      { text_prompts: [{ text: prompt }], cfg_scale: 7, style_preset: "fast" },
      { headers: { Authorization: apiKey }, timeout: 15000 }
    );
    return { success: true, data: data.choices[0].text };
  } catch {
    return { success: false, error: "stability failed" };
  }
};
