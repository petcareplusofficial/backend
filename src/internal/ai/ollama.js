import sysPrompt from "./dietPrompts.js";
import supplementPrompt from "./supplementPrompts.js";
import vaccinePrompt from "./vaccinePrompts.js";
const AiService = async (prompt, info, type) => {
  let aiPrompt = null;
  switch (type) {
    case "diet":
      aiPrompt = sysPrompt(prompt, info);
      break;
    case "supplements":
      aiPrompt = supplementPrompt(prompt, info);
      break;
    case "vaccines":
      aiPrompt = vaccinePrompt(prompt, info);
      break;
    default:
      throw new Error("Invalid type");
  }

  const response = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "qwen2.5-coder:14b",
      prompt: aiPrompt,
      stream: false,
    }),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  let respStr = data.response.trim();

  respStr = respStr
    .replace(/^```json/i, "")
    .replace(/^```/, "")
    .replace(/```$/, "")
    .trim();

  try {
    return JSON.parse(respStr);
  } catch {
    return respStr;
  }
  // console.log("API response:", respStr);
  return respStr;
};

export { AiService };

// // generate new mealplan
// const result = await AiService(
//   "Create a healthy meal plan for my cat",
//   {
//     task: "pet_meal_routine",
//     petType: "cat",
//     age: "2 years",
//     activityLevel: "medium",
//   },
//   "diet",
// );
// console.log("diet responses:");
// console.log(result[0]);

// // testing usecases here!

// // update breakfast funcctionality singluar
// const newBreakfast = await AiService(
//   "Make breakfast lighter and more hydrating",
//   {
//     task: "pet_meal_routine",
//     petType: "cat",
//     age: "2 years",
//     activityLevel: "medium",
//     meal: "breakfast",
//     oldData: {
//       meal: "breakfast",
//       food: "tuna flakes",
//       notes: "light portion",
//     },
//   },
//   "diet",
// );

// console.log(newBreakfast);

// console.log("supplement responses:");

// const supplementResponse = await AiService(
//   "Create a supplement plan for my cat",
//   {
//     petSpecs: {
//       petType: "cat",
//       age: "2 years",
//       weight: "7kg",
//       height: "10cm",
//       activityLevel: "medium",
//     },
//     allergies: "milk, cheese, vitamin D",
//   },
//   "supplements",
// );

// console.log(supplementResponse);
// const result = await AiService(
//   "Generate this month's vaccination schedule",
//   {
//     petSpecs: {
//       species: "dog",
//       breed: "labrador",
//       age: "5 years",
//       weight: "15kg",
//       activityLevel: "medium",
//       health: "none",
//     },
//   },
//   "vaccines"
// );

// console.log(result);
