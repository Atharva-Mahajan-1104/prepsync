// api/suggest-answer.js
import axios from "axios";
import { runtime } from "./_shared.js";
import natural from "natural";

export const config = { runtime };

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { question, requiredKeywords } = req.body || {};
  if (!question || !requiredKeywords) {
    return res.status(400).json({ error: "Missing question or keywords" });
  }

  const prompt = `
You are an interview assistant. 
Answer the following interview question briefly and directly — keep it under 100 words. 
Avoid bullet points, subheadings, or lengthy explanations. 
Focus on clarity, accuracy, and the required key terms. 
Question: "${question}" 
Include these concepts naturally: ${requiredKeywords.join(", ")}. 
Tone: concise, professional, suitable for a verbal interview answer.`.trim();

  try {
    const { data } = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
      { contents: [{ parts: [{ text: prompt }] }] },
      { params: { key: process.env.HUGGINGFACE_API_KEY }, headers: { "Content-Type": "application/json" } }
    );

    let suggestedAnswer = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";
    if (!suggestedAnswer) suggestedAnswer = "Could not generate an answer at this time.";

    // ensure all required keywords are present (simple check)
    const tokenizer = new natural.WordTokenizer();
    const tokens = tokenizer.tokenize(suggestedAnswer.toLowerCase());
    const missing = requiredKeywords.filter(k => !tokens.some(t => t.includes(k.toLowerCase())));
    if (missing.length) {
      suggestedAnswer += `\n\nAdditional important concepts to consider:\n` +
        missing.map(k => `- ${k}: This is a crucial aspect that should be mentioned in this context.`).join("\n");
    }

    return res.status(200).json({ suggestedAnswer });
  } catch (e) {
    console.error("AI suggestion error:", e.response?.data || e.message);
    const fallback =
      `Here's a concise way to answer:\n\n` +
      requiredKeywords.map((k, i) => `  ${i + 1}. ${k}: explain its role briefly`).join("\n") +
      `\nKeep it short and direct.`;
    return res.status(200).json({ suggestedAnswer: fallback });
  }
}
