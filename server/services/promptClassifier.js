// Very lightweight heuristic. Replace with ML later.
function classifyPrompt(prompt = "") {
  const p = prompt.toLowerCase();
  if (/code|typescript|python|javascript|bug|algorithm/.test(p)) return "code";
  if (/write|story|poem|creative|lyrics/.test(p)) return "creative";
  return "qa"; // default factual Q&A
}

module.exports = classifyPrompt;
