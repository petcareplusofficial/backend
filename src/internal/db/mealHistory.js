import mongoose from "mongoose";

const MealHistorySchema = new mongoose.Schema({
  consumedAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  petId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pet",
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

const MealHistoryModel = mongoose.model("MealHistory", MealHistorySchema);

class MealHistory {
  constructor(petId, mealType, name, calories, weight, proteins, carbs, fats) {
    this.petId = petId;
    this.mealType = mealType;
    this.name = name;
    this.calories = calories;
    this.weight = weight;
    this.proteins = proteins;
    this.carbs = carbs;
    this.fats = fats;
  }

  async save() {
    const meal = new MealHistoryModel(this);
    await meal.save();
  }

  static async getAllForLastMonthByPetId(petId) {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    console.log(startOfMonth, endOfMonth);
    console.log(petId);
    return MealHistoryModel.find({
      petId: petId,
      consumedAt: { $gte: startOfMonth, $lte: endOfMonth },
    });
  }
  static async getAllForLastYearByPetId(petId) {
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const endOfYear = new Date(now.getFullYear() + 1, 0, 0);

    return MealHistoryModel.find({
      petId: petId,
      consumedAt: { $gte: startOfYear, $lte: endOfYear },
    });
  }
}

export { MealHistory, MealHistoryModel };
