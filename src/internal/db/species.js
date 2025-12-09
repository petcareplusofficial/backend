import mongoose from "mongoose";

const SpeciesSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});
SpeciesSchema.virtual("breeds", {
  ref: "Breed",
  localField: "_id",
  foreignField: "speciesId",
});
SpeciesSchema.set("toObject", { virtuals: true });
SpeciesSchema.set("toJSON", { virtuals: true });

const SpeciesModel = mongoose.model("Species", SpeciesSchema);

class Species {
  constructor(name, description) {
    this.name = name;
    this.description = description;
  }
  async save() {
    const species = new SpeciesModel(this);
    await species.save();
  }
  static async getAll() {
    return await SpeciesModel.find().populate("breeds");
  }
  async getById(id) {
    return await SpeciesModel.findById(id);
  }
  static async seed() {
    await SpeciesModel.create([
      { name: "Dog", description: "mans best friend" },
      { name: "Cat", description: "cute pet" },
    ]);
  }
}
export { Species, SpeciesModel };
