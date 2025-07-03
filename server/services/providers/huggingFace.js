// huggingFace.js
const axios = require("axios");
const HF_MODEL = "tiiuae/falcon-7b-instruct"; // change to your model
module.exports = async (prompt, apiKey) => {
  try {
    const { data } = await axios.post(
      `https://api-inference.huggingface.co/models/${HF_MODEL}`,
      { inputs: prompt },
      { headers: { Authorization: `Bearer ${apiKey}` }, timeout: 20000 }
    );
    const text = Array.isArray(data)
      ? data[0].generated_text
      : data.generated_text;
    return { success: true, data: text };
  } catch {
    return { success: false, error: "huggingface failed" };
  }
};
