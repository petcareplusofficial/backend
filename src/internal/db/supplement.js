import mongoose from "mongoose";

const SupplementSchema = new mongoose.Schema({
  dietId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Diet",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const SupplementModel = mongoose.model("Supplement", SupplementSchema);

class Supplement {
  constructor(dietId, name, description) {
    this.dietId = dietId;
    this.name = name;
    this.description = description;
  }

  async save() {
    const supplement = new SupplementModel(this);
    await supplement.save();
  }
}

export { Supplement };
