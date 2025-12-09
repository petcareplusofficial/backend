import { Diet } from "../internal/db/diet.js";
import { Meal } from "../internal/db/meal.js";
import { Pet } from "../internal/db/pet.js";
import { Supplement } from "../internal/db/supplement.js";
import { AiService } from "../internal/ai/ollama.js";
import { Allergy } from "../internal/db/allergies.js";
import { MealHistory } from "../internal/db/mealHistory.js";

const CreateDiet = () => {
  return async (req, res) => {
    try {
      const { petId, favoriteFoods, foodPreferences, notes } = req.body;
      const diet = new Diet(petId, favoriteFoods, foodPreferences, notes);
      await diet.save();
      const pet = await Pet.getById(petId);
      const allergies = await Allergy.getAllAllergies(petId);
      let allergiesText = "";
      for (let i = 0; i < allergies.length; i++) {
        allergiesText += allergies[i].name + ", ";
      }
      // console.log(diet.id);
      const meals = await AiService(
        "Create a healthy meal plan for my cat",
        {
          task: "pet_meal_routine",
          petType: pet.breedId.speciesId.name,
          age: pet.age,
          activityLevel: "medium",
        },
        "diet",
      );

      const supplements = await AiService(
        "Create a supplement plan for my cat",
        {
          petSpecs: {
            petType: pet.breedId.speciesId.name,
            age: pet.age,
            weight: "7kg",
            height: "15cm",
            activityLevel: "medium",
          },
          allergies: allergiesText,
        },
        "supplements",
      );

      for (let mealEl of meals) {
        const meal = new Meal(
          diet.id,
          mealEl.meal, // breakfast or lucnh or dinner
          mealEl.food,
          mealEl.calories,
          Number(mealEl.weight),
          mealEl.proteins,
          mealEl.carbs,
          mealEl.fats,
        );
        meal.weight = Number(mealEl.weight);
        await meal.save();
      }

      for (let sup of supplements) {
        const supplement = new Supplement(diet.id, sup.name, sup.description);
        await supplement.save();
      }
      let response = {
        dietId: diet.id,
        meals: meals,
        supplements: supplements,
      };

      await Pet.setDietForPet(petId);

      // console.log(response);
      res.status(201).json(response);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
};

const GetDietByPetId = () => async (req, res) => {
  try {
    const petId = req.params.id;
    const diet = await Diet.getAllByPetId(petId);
    console.log(diet);
    res.status(200).json(diet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const RefreshMeal = () => async (req, res) => {
  try {
    const mealId = req.params.mealId;
    const dietId = req.params.dietId;

    const diet = await Diet.getById(dietId);
    // console.log(diet);
    const pet = await Pet.getById(diet.petId);
    // console.log(pet);
    let oldMeal = null;
    // console.log(diet.meals);
    for (const meal of diet.meals) {
      // console.log("idParam:", mealId, "from for loop meal", String(meal._id));
      if (String(meal._id) === mealId) {
        oldMeal = meal;
      }
    }
    // console.log(oldMeal);
    const aiResponse = await AiService(
      "Make breakfast lighter and more hydrating",
      {
        task: "pet_meal_routine",
        petType: pet.breedId.speciesId.name,
        age: pet.age,
        activityLevel: "medium",
        meal: oldMeal.mealType,
        oldData: {
          mealType: oldMeal.mealType,
          name: oldMeal.name,
          calories: oldMeal.calories,
          weight: oldMeal.weight,
          proteins: oldMeal.proteins,
          carbs: oldMeal.carbs,
          fats: oldMeal.fats,
          notes: "",
        },
      },
      "diet",
    );
    // console.log(aiResponse);
    const meal = new Meal(
      "",
      aiResponse.meal,
      aiResponse.food,
      aiResponse.calories,
      aiResponse.weight,
      aiResponse.proteins,
      aiResponse.carbs,
      aiResponse.fats,
    );
    await meal.UpdateById(mealId);
    // console.log("old meal", oldMeal);
    const mealHistory = new MealHistory(
      diet.petId,
      oldMeal.mealType,
      oldMeal.name,
      oldMeal.calories,
      oldMeal.weight,
      oldMeal.proteins,
      oldMeal.carbs,
      oldMeal.fats,
    );
    await mealHistory.save();
    res.status(200).json(meal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export { CreateDiet, GetDietByPetId, RefreshMeal };
