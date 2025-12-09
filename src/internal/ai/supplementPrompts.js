export default function supplementPrompt(prompt, info) {
  const { petSpecs, allergies } = info;

  return `
You are an expert veterinary nutritionist. Based on the following information, recommend the best dietary supplements.

PET DETAILS:
- Age: ${petSpecs?.age || "unknown"}
- Weight: ${petSpecs?.weight || "unknown"}
- Height: ${petSpecs?.height || "unknown"}
- Activity level: ${petSpecs?.activityLevel || "unknown"}

ALLERGIES: ${allergies}

USER REQUEST:
"${prompt}"

RESPONSE RULES:
- Return ONLY a JSON array.
- Each element must contain exactly:
  {
    "name": "<supplement name>",
    "description": "<short benefit description, max 6 words>"
  }
- Avoid recommending anything containing allergens.
- If info is missing, make safe, general recommendations (e.g., fish oil, probiotics).
- No explanations or markdown formatting.

Example output:
[
  { "name": "Omega-3 Fish Oil", "description": "Supports skin and coat health" },
  { "name": "Glucosamine", "description": "Helps joint flexibility and strength" }
]
`;
}
