// api/questions/[role].js
import { questions, allowedDifficultiesForLevel, runtime } from "../_shared.js";

export const config = { runtime };

export default async function handler(req, res) {
  const { role } = req.query;
  const { experienceLevel } = req.query; // optional ?experienceLevel=Junior

  if (!role) return res.status(400).json({ error: "Role parameter is required" });

  const bank = questions[role];
  if (!bank) return res.status(404).json({ error: `No questions found for role: ${role}` });

  // filter by level if provided
  if (experienceLevel) {
    const allowed = allowedDifficultiesForLevel(experienceLevel);
    if (Array.isArray(allowed)) {
      const filtered = bank.filter(q => allowed.includes((q.difficulty || "Medium").toLowerCase()));
      return res.status(200).json(filtered.length ? filtered : bank);
    }
  }

  return res.status(200).json(bank);
}
