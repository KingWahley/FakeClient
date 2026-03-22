function getNicheDetailRules(niche) {
  const sharedRules = [
    "Never assume the contractor has information outside this document.",
    "If a real client would normally need to provide a detail, include that detail in the brief instead of leaving it implied.",
    "Prefer concrete specifications over vague language.",
    "Include numbers, quantities, dimensions, platforms, formats, or timelines wherever they would help execution.",
    "Make the brief feel like a real paying client wrote it with enough detail for the work to begin immediately.",
  ];

  const nicheRules = {
    "Website Developer": [
      "Specify the website type, required pages, core user flows, CMS or no-CMS expectation, integrations, device priorities, performance expectations, SEO needs, and launch deadline.",
      "Include brand direction, preferred competitors or references, required features, copy status, image or asset availability, hosting expectation, analytics, and handoff expectations.",
    ],
    "Graphic Designer": [
      "Specify the exact design items needed, sizes or dimensions, print or digital usage, required file formats, brand colors, typography direction, image treatment, and revision expectations.",
      "If the work is for campaigns or packaging, include placement requirements, mandatory copy, legal text, and production constraints.",
    ],
    "Mobile App Developer": [
      "Specify platform requirements, user roles, core screens, authentication method, backend expectations, integrations, notifications, offline behavior, and release scope.",
      "Include security, performance, analytics, accessibility, QA, and store-readiness expectations where relevant.",
    ],
    "UI/UX": [
      "Specify the product type, user problems, target flows, research inputs, required screens, fidelity level, design system expectations, responsive needs, and prototype requirements.",
      "Include usability goals, accessibility expectations, handoff detail, and what stakeholders must approve.",
    ],
    "Copy Writing": [
      "Specify the content type, word-count guidance, tone of voice, audience pain points, CTA, SEO keywords if relevant, banned claims, mandatory points, and approval constraints.",
      "Include channel-specific requirements such as landing page sections, email sequence count, ad variants, or social caption quantity.",
    ],
    "Fashion Illustrator": [
      "Specify the number of looks or sketches, garment category, pose or figure style, illustration style, level of realism, front/back/detail views, color palette, and presentation format.",
      "Include fabric cues, trim details, silhouette direction, reference era or mood, and whether technical callouts are required.",
    ],
    "Fashion Designer": [
      "Specify garment type, number of looks or pieces, collection theme, silhouette, target customer, use occasion, fabric type, fabric weight, color palette, print or embellishment direction, and trims.",
      "Include construction details, fit direction, measurements or sizing range, closures, lining, finishing quality, seasonal context, reference style, production quantity expectation, and deliverables such as tech packs or flats.",
    ],
    "2D Animator": [
      "Specify the animation type, duration, aspect ratio, storyboard expectation, illustration style, scene count, voiceover or no voiceover, music or SFX expectation, and delivery formats.",
      "Include pacing, transitions, branding requirements, revision rounds, and platform usage such as ads, explainer video, or social media.",
    ],
  };

  return [...sharedRules, ...(nicheRules[niche] || [])];
}

function getFullBriefSections(niche) {
  const baseSections = [
    "Client Brief",
    "Project Overview",
    "Business Context",
    "Primary Goal",
    "Target Audience",
    "Project Scope",
    "Creative Direction",
    "Detailed Requirements",
    "Deliverables",
    "Assets Provided",
    "Technical Or Production Specifications",
    "Constraints And Non-Negotiables",
    "Timeline",
    "Budget",
    "Approval Criteria",
    "Success Metrics",
  ];

  if (niche === "Fashion Designer" || niche === "Fashion Illustrator") {
    return [
      "Client Brief",
      "Project Overview",
      "Brand And Collection Context",
      "Target Customer",
      "Use Occasion And Season",
      "Style Direction",
      "Color Palette",
      "Fabric And Materials",
      "Silhouette And Construction Details",
      "Sizing And Fit Notes",
      "Deliverables",
      "Reference Points",
      "Constraints And Non-Negotiables",
      "Timeline",
      "Budget",
      "Approval Criteria",
      "Success Metrics",
    ];
  }

  return baseSections;
}

export function buildPrompt({ niche, scope, level }) {
  const detailRules = getNicheDetailRules(niche)
    .map((rule) => `- ${rule}`)
    .join("\n");
  const sectionRules = getFullBriefSections(niche)
    .map((section) => `- ${section}`)
    .join("\n");

  return `You are a senior agency strategist and project scoping specialist.

Write a realistic, execution-ready client brief for a ${niche} project.

Seniority target: ${level}
Brief type: ${scope}

GLOBAL WRITING RULES:
- Output plain text only.
- Do not use markdown bullets, asterisks, or tables.
- Use section headings on their own lines.
- Write like a real client or account lead documenting a paid project.
- The brief must be fully self-contained and should not rely on outside explanations, missing attachments, or unstated assumptions.
- Avoid generic placeholders like "choose suitable colors" or "use the appropriate style." State the colors, style direction, and execution details directly.
- When information is uncertain, make realistic decisions and include them in the brief as client-approved directions.
- Every section should help the contractor start work immediately.

DETAIL EXPECTATIONS:
${detailRules}

QUICK BRIEF RULES:
- If the brief type is Quick Brief, still make it self-contained.
- For Quick Brief, output only these sections:
- Client Brief
- Deliverables
- Key Requirements
- Timeline
- Budget
- Keep the Quick Brief concise but specific.

FULL BRIEF RULES:
- If the brief type is Full Brief, include all of these sections in this exact order:
${sectionRules}
- Under Detailed Requirements or equivalent niche-specific sections, include enough practical detail that the contractor does not need to ask basic kickoff questions before starting.
- Include explicit specs, style choices, priorities, quantities, and acceptance standards.
${level === "Junior" ? "- Keep the scope clearly defined and the instructions straightforward." : ""}
${level === "Mid" ? "- Include moderate complexity, realistic trade-offs, and some stakeholder expectations." : ""}
${level === "Senior" ? "- Include realistic complexity, edge cases, competing priorities, and nuanced constraints, but still provide enough information to execute." : ""}

CONTENT RULES:
- Invent realistic client details, business context, and constraints.
- Make the brief commercially believable.
- Include concrete examples where helpful, such as named colors, materials, screen types, file formats, dimensions, garment details, or required deliverable counts.
- Do not add commentary, tips, or explanations outside the brief itself.
- Do not mention that you are an AI.
`;
}
