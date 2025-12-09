import mongoose from "mongoose";

const AllergySchema = new mongoose.Schema({
  petId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pet",
    required: true,
  },
  food: {
    type: String,
    required: true,
  },
  symptoms: {
    type: String,
    required: true,
  },
  severity: {
    type: String,
    enum: ["mild", "moderate", "severe"],
    required: true,
  },
  notes: {
    type: String,
    required: false,
    default: "",
  },
});

const AllergyModel = mongoose.model("Allergy", AllergySchema);

class Allergy {
  constructor(petId, food, symptoms, severity, notes) {
    this.petId = petId;
    this.food = food;
    this.symptoms = symptoms;
    this.severity = severity;
    this.notes = notes;
  }

  async save() {
    console.log(this);
    const newAllergy = new AllergyModel(this);
    await newAllergy.save();
  }
  static async getAllAllergies(petId) {
    return await AllergyModel.find({ petId: petId });
  }
}

export { Allergy };
