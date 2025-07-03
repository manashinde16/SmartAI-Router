// togetherAI.js
const axios = require("axios");
module.exports = async (prompt, apiKey) => {
  try {
    const { data } = await axios.post(
      "https://api.together.xyz/v1/chat/completions",
      {
        model: "togethercomputer/llama-2-70b-chat",
        messages: [{ role: "user", content: prompt }],
      },
      { headers: { Authorization: `Bearer ${apiKey}` }, timeout: 10000 }
    );
    return { success: true, data: data.choices[0].message.content };
  } catch {
    return { success: false, error: "togetherai failed" };
  }
};
