import mongoose from "mongoose";

const VetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  rate: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
    default: 0,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const VetModel = mongoose.model("Vet", VetSchema);

class Vet {
  constructor(name, rate, location, description) {
    this.name = name;
    this.rate = rate;
    this.location = location;
    this.description = description;
  }
  async save() {
    const vet = new VetModel(this);
    await vet.save();
  }
  static async getAll() {
    return await VetModel.find();
  }
  static async getById(id) {
    return await VetModel.findById(id);
  }
  static async seed() {
    await VetModel.create([
      {
        name: "Dr. John Doe",
        rate: 4,
        location: "Vancouver",
        description:
          "Experienced veterinarian with a passion for animal welfare.",
      },
      {
        name: "Dr. Jane Smith",
        rate: 5,
        location: "Burnaby",
        description: "Specializes in pet nutrition and behavior.",
      },
      {
        name: "Dr. Michael Johnson",
        rate: 3,
        location: "Richmond",
        description: "Expert in emergency veterinary care.",
      },
    ]);
  }
}

export { VetModel, Vet };
