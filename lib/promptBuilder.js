export function buildPrompt({ niche, scope, level }) {
  return `
You are a senior creative director at a professional agency.

Generate a realistic ${scope.toLowerCase()} client brief for a ${niche} project.

Difficulty level: ${level}

Rules:
- Follow real agency standards
- Include business context, objectives, target audience
- Define clear deliverables and constraints
- Include success metrics
- At Senior level, introduce ambiguity, trade-offs, and missing info
- Do NOT explain the brief — just write it

Tone:
Professional, realistic, client-authentic.
`;
}
