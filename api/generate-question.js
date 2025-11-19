// api/generate-question.js
import axios from "axios";
import { sanitizeJsonLike, runtime } from "./_shared.js";

export const config = { runtime };

async function callGemini(text) {
  const { data } = await axios.post(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
    { contents: [{ parts: [{ text }] }] },
    { params: { key: process.env.HUGGINGFACE_API_KEY }, headers: { "Content-Type": "application/json" } }
  );
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { company, role, experienceLevel } = req.body || {};
  if (!company || !role || !experienceLevel) {
    return res.status(400).json({ error: "Missing parameters. Provide company, role, experienceLevel." });
  }

  const prompt = `
You are an AI that creates interview questions.
Generate EXACTLY 3 technical interview questions for a ${experienceLevel}-level ${role} at ${company}.
Respond ONLY with valid JSON (ASCII), no markdown, no commentary.
Format:
[
  {"question": "...", "difficulty": "Easy|Medium|Hard", "requiredKeywords": ["kw1","kw2","kw3","kw4","kw5"]},
  {"question": "...", "difficulty": "Easy|Medium|Hard", "requiredKeywords": ["kw1","kw2","kw3","kw4","kw5"]},
  {"question": "...", "difficulty": "Easy|Medium|Hard", "requiredKeywords": ["kw1","kw2","kw3","kw4","kw5"]}
]`.trim();

  try {
    let aiText = await callGemini(prompt);

    // attempt direct parse
    try {
      const parsed = JSON.parse(aiText);
      if (Array.isArray(parsed) && parsed.length) return res.status(200).json(parsed);
    } catch {}

    // sanitize & parse
    const cleaned = sanitizeJsonLike(aiText);
    try {
      const parsed = JSON.parse(cleaned);
      if (Array.isArray(parsed) && parsed.length) return res.status(200).json(parsed);
    } catch {}

    // fallback extraction
    const m = (aiText || "").match(/"(question)"\s*:\s*"([^"]+?)"/g);
    if (m && m.length) {
      const out = m.slice(0, 3).map(q => ({
        question: q.replace(/.*"question"\s*:\s*"([^"]+)".*/, "$1"),
        difficulty: "Medium",
        requiredKeywords: []
      }));
      return res.status(200).json(out);
    }

    // last resort
    return res.status(200).json([{
      question: "Describe how you would design and scale a system for this role.",
      difficulty: "Medium",
      requiredKeywords: []
    }]);
  } catch (e) {
    console.error("Generate error:", e.response?.data || e.message);
    return res.status(500).json({ error: "Failed to generate questions dynamically" });
  }
}
