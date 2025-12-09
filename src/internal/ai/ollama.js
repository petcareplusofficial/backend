import { Ollama } from "ollama";
import sysPrompt from "./dietPrompts.js";
import supplementPrompt from "./supplementPrompts.js";
import vaccinePrompt from "./vaccinePrompts.js";

const ollama = new Ollama({
  host: "https://ollama.com",
  headers: {
    Authorization: "Bearer " + process.env.OLLAMA_API_KEY,
  },
});

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

  const response = await ollama.chat({
    model: "gpt-oss:120b-cloud",
    messages: [
      { 
        role: "system", 
        content: "You are a pet care AI assistant. Always respond with valid JSON." 
      },
      { 
        role: "user", 
        content: aiPrompt 
      }
    ],
    stream: false,
    format: "json",
  });
 
  let respStr = response.message.content.trim();

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
