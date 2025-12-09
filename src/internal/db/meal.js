import mongoose from "mongoose";

const MealSchema = new mongoose.Schema({
  dietId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Diet",
    required: true,
  },
  mealType: {
    type: String,
    enum: ["breakfast", "lunch", "dinner"],
    required: true,
  },
  calories: {
    type: Number,
    required: true,
  },
  proteins: {
    type: Number,
    required: true,
  },
  carbs: {
    type: Number,
    required: true,
  },
  fats: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
});

const MealModel = mongoose.model("Meal", MealSchema);

class Meal {
  constructor(dietId, mealType, name, calories, weight, proteins, carbs, fats) {
    this.dietId = dietId;
    this.mealType = mealType;
    this.name = name;
    this.calories = calories;
    this.weight = weight;
    this.proteins = proteins;
    this.carbs = carbs;
    this.fats = fats;
  }

  async save() {
    const meal = new MealModel(this);
    await meal.save();
  }
  async UpdateById(id) {
    const oldMeal = await MealModel.findById(id);
    this.dietId = oldMeal.dietId;
    await MealModel.findByIdAndUpdate(id, this);
  }
}

export { Meal };
