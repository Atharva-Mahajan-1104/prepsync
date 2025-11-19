// api/evaluate.js
import { evaluateAnswer, runtime } from "./_shared.js";

export const config = { runtime };

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { answer, question, role, company, experienceLevel } = req.body || {};
  if (!answer || !question || !question.requiredKeywords) {
    return res.status(400).json({ error: "Missing required data" });
  }

  try {
    const result = evaluateAnswer(answer, question, { role, company, experienceLevel });
    return res.status(200).json(result);
  } catch (e) {
    console.error("Evaluation error:", e);
    return res.status(500).json({ error: "Failed to analyze answer" });
  }
}
