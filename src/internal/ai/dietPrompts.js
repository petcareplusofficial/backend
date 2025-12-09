const sysPrompt = (prompt, info) => {
  switch (info.task) {
    case "pet_meal_routine":
      if (info.meal) {
        return `
You are an expert pet nutritionist.

The user wants to regenerate or update only the "${info.meal}" meal for their ${
          info.petType
        }.
Use the provided old meal data as reference (if available) to improve or modify it.

STRICT RULES:
1. Output must be valid JSON only (no code blocks or text).
2. Respond with exactly ONE JSON object:
{
  "meal": "breakfast" | "lunch" | "dinner",
  "food": "<short descriptive food name>",
  "calories": <numeric value in kcal>,
  "weight": "<approximate portion weight in grams only numeric>",
  "proteins": <grams of protein>,
  "carbs": <grams of carbohydrates>,
  "fats": <grams of fats>,
  "notes": "<short optional nutrition note>"
}
3. Consider:
   - petType
   - age
   - activity level
   - oldData (if provided)
4. Estimate realistic calories and portion weight for the pet.
5. If oldData exists, improve or refine it (e.g. lighter, more hydrating, more protein, etc.).
6. Do not include any explanations or text outside JSON.

PET INFO:
${JSON.stringify(
  {
    petType: info.petType,
    age: info.age,
    activityLevel: info.activityLevel,
  },
  null,
  2,
)}

OLD DATA (if any):
${info.oldData ? JSON.stringify(info.oldData, null, 2) : "None"}

PROMPT:
${prompt}
`;
      }

      return `
You are an expert pet nutritionist.
Generate a JSON array describing a healthy daily meal plan for a ${
        info.petType
      }.

STRICT RULES:
1. Response must be valid JSON only (no code blocks or text).
2. Each object must have exactly these fields:
   {
     "meal": "breakfast" | "lunch" | "dinner",
     "food": "<short descriptive food name>",
     "calories": <numeric value in kcal>,
     "weight": "<approximate portion weight in grams>",
     "proteins": <grams of protein>,
     "carbs": <grams of carbohydrates>,
     "fats": <grams of fats>,
     "notes": "<short optional nutrition note>"
   }
3. Consider petType, age, and activity level when deciding calories and portion weight.
4. Do not include explanations or extra text outside JSON.

Example format:
[
  {
    "meal": "breakfast",
    "food": "tuna flakes",
    "calories": 120,
    "weight": "60",
    "proteins": 18,
    "carbs": 0,
    "fats": 5,
    "notes": "light portion for hydration"
  },
  {
    "meal": "lunch",
    "food": "chicken pate",
    "calories": 180,
    "weight": "80",
    "proteins": 25,
    "carbs": 2,
    "fats": 8
  },
  {
    "meal": "dinner",
    "food": "salmon bites",
    "calories": 160,
    "weight": "70",
    "proteins": 22,
    "carbs": 1,
    "fats": 7,
    "notes": "include hydration"
  }
]

INFO:
${JSON.stringify(info, null, 2)}

PROMPT:
${prompt}
`;
    default:
      return `
You are a helpful AI assistant.
Follow the user's prompt carefully and respond clearly.

PROMPT:
${prompt}

INFO:
${JSON.stringify(info, null, 2)}
`;
  }
};

export default sysPrompt;
