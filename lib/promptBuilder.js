export function buildPrompt({ niche, scope, level }) {
  return `
You are a senior creative director at a professional agency.

Generate a realistic ${scope.toLowerCase()} client brief for a ${niche} project.

Difficulty level: ${level}

CRITICAL FORMATTING RULES:
- Output PLAIN TEXT ONLY
- Do NOT use markdown
- Do NOT use asterisks (*)
- Do NOT use bold, italics, or bullet symbols
- Use clear section titles on their own lines
- Use normal paragraphs and line breaks only

CONTENT RULES:
- Follow real agency standards
- Include business context, objectives, target audience
- Define clear deliverables and constraints
- Include success metrics
- At Senior level, introduce ambiguity and trade-offs
- Do NOT explain the brief

Tone:
Professional, realistic, client-authentic.
`;
}
