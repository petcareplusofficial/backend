import mongoose from "mongoose";
import { SpeciesModel } from "./species.js";
const BreedSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  respiratory: {
    type: Number,
    required: true,
  },
  heartRate: {
    type: Number,
    required: true,
  },
  bloodPressure: {
    type: Number,
    required: true,
  },
  bmi: {
    type: Number,
    required: true,
  },
  speciesId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Species",
    required: true,
  },
});
const BreedModel = mongoose.model("Breed", BreedSchema);

class Breed {
  constructor(name, description, speciesId) {
    this.name = name;
    this.description = description;
    this.speciesId = speciesId;
  }
  async save() {
    const breed = new BreedModel(this);
    await breed.save();
  }
  static async findById(id) {
    return await BreedModel.findById(id);
  }
  static async seed() {
    await BreedModel.create([
      // dogs
      {
        name: "Labrador Retriever",
        description: "labrador breed",
        speciesId: "68f6af8c27e865230c6057bd",
      },
      {
        name: "Siamese",
        description: "siamese breed",
        speciesId: "68f6af8c27e865230c6057bd",
      },
      {
        name: "German Shepherd",
        description: "dog from germany",
        speciesId: "68f6af8c27e865230c6057bd",
      },

      // cats
      {
        name: "Persian",
        description: "persian breed",
        speciesId: "68f6af8c27e865230c6057be",
      },
      {
        name: "british",
        description: "british breed",
        speciesId: "68f6af8c27e865230c6057be",
      },
    ]);
  }
}
export { Breed, BreedModel };
// 68f6af8c27e865230c6057be
