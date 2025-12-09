import { MealHistory } from "../internal/db/mealHistory.js";

const createMealHistory = async (req, res) => {
  try {
    const { petId, mealType, name, calories, weight, proteins, carbs, fats } =
      req.body;
    const mealHistory = new MealHistory(
      petId,
      mealType,
      name,
      calories,
      weight,
      proteins,
      carbs,
      fats,
    );
    await mealHistory.save();
    res.status(201).json(mealHistory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllMealHistoriesWithTimeQuery = async (req, res) => {
  try {
    const { petId } = req.params;
    const { time } = req.query;
    if (!time) {
      res
        .status(400)
        .json({ error: "Missing required query parameter 'time'" });
    }
    if (time === "lastMonth") {
      const mealHistories = await MealHistory.getAllForLastMonthByPetId(petId);
      res.status(200).json(mealHistories);
    } else if (time === "lastYear") {
      const mealHistories = await MealHistory.getAllForLastYearByPetId(petId);
      res.status(200).json(mealHistories);
    } else {
      res.status(400).json({ error: "Invalid query parameter 'time'" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export { createMealHistory, getAllMealHistoriesWithTimeQuery };
