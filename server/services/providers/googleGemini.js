// googleGemini.js
const axios = require("axios");
module.exports = async (prompt, apiKey) => {
  try {
    const { data } = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
      { contents: [{ parts: [{ text: prompt }] }] },
      { timeout: 10000 }
    );
    return { success: true, data: data.candidates[0].content.parts[0].text };
  } catch {
    return { success: false, error: "gemini failed" };
  }
};
