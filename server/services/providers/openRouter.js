// openRouter.js
const axios = require("axios");
module.exports = async (prompt, apiKey) => {
  try {
    const { data } = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "mistralai/mistral-7b-instruct",
        messages: [{ role: "user", content: prompt }],
      },
      { headers: { Authorization: `Bearer ${apiKey}` }, timeout: 10000 }
    );
    return { success: true, data: data.choices[0].message.content };
  } catch {
    return { success: false, error: "openrouter failed" };
  }
};
