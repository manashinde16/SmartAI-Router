// replicate.js   (simple fallback – no polling for streaming)
const axios = require("axios");
module.exports = async (prompt, apiKey) => {
  try {
    const { data } = await axios.post(
      "https://api.replicate.com/v1/completions",
      { model: "meta/llama-2-70b-chat", prompt },
      { headers: { Authorization: `Token ${apiKey}` }, timeout: 15000 }
    );
    return { success: true, data: data.choices[0].text };
  } catch {
    return { success: false, error: "replicate failed" };
  }
};
