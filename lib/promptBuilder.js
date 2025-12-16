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

STRUCTURE REQUIREMENTS:
- Start with a section titled "Client Brief"
- The Quick Brief MUST be written in second person, addressing the contractor as "You"
- The Quick Brief MUST be exactly 2 paragraphs
- Maximum total length: 60 words
- State only what the contractor is expected to deliver and achieve
- No background, no explanations, no strategy, no storytelling

CONTENT RULES:
- Follow real agency standards
- Include business context, objectives, and target audience after the Quick Brief
- Define clear deliverables and constraints
- Include success metrics
- when  Senior level, introduce ambiguity and trade-offs
- Do NOT explain the brief or give advice

Tone:
Professional, realistic, client-authentic.
`;
}
