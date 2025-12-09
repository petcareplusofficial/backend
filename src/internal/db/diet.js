import mongoose from "mongoose";

const DietSchema = new mongoose.Schema({
  petId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pet",
    required: true,
    unique: true,
  },
  favoriteFoods: {
    type: String,
    required: false,
  },
  foodPreferences: {
    type: String,
    required: false,
  },
  notes: {
    type: String,
    required: false,
  },
});
DietSchema.virtual("meals", {
  ref: "Meal",
  localField: "_id",
  foreignField: "dietId",
});
DietSchema.virtual("supplements", {
  ref: "Supplement",
  localField: "_id",
  foreignField: "dietId",
});
DietSchema.set("toObject", { virtuals: true });
DietSchema.set("toJSON", { virtuals: true });

const DietModel = mongoose.model("DietPlanInfo", DietSchema);

class Diet {
  constructor(petId, favoriteFoods, foodPreferences, notes) {
    this.petId = petId;
    this.favoriteFoods = favoriteFoods;
    this.foodPreferences = foodPreferences;
    this.notes = notes;
  }
  async save() {
    const diet = new DietModel(this);
    const savedDiet = await diet.save();
    this.id = savedDiet._id;
  }
  static async getAllByPetId(petId) {
    return DietModel.findOne({ petId })
      .populate("meals")
      .populate("supplements")
      .lean();
  }
  static async getById(dietId) {
    return DietModel.findById(dietId)
      .populate("meals")
      .populate("supplements")
      .lean();
  }
}

export { Diet };
