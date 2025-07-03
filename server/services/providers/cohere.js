// cohere.js
const axios = require("axios");
module.exports = async (prompt, apiKey) => {
  try {
    const { data } = await axios.post(
      "https://api.cohere.ai/v1/chat",
      { model: "command", message: prompt },
      { headers: { Authorization: `Bearer ${apiKey}` }, timeout: 10000 }
    );
    return { success: true, data: data.text };
  } catch {
    return { success: false, error: "cohere failed" };
  }
};
