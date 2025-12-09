import mongoose from "mongoose";
import { BreedModel } from "./breed.js";
const PetSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    // unique: true,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  breedId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Breed",
    required: true,
  },
  sex: {
    type: String,
    enum: ["male", "female"],
    required: true,
  },
  profileImage: {
    data: Buffer,
    contentType: String,
  },
  dob: {
    type: Date,
    required: true,
  },
  hasDiet: {
    type: Boolean,
    default: false,
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
const PetModel = mongoose.model("Pet", PetSchema);

class Pet {
  constructor(userId, name, age, breedId, sex, profileImage, dob) {
    this.userId = userId;
    this.profileImage = profileImage;
    this.name = name;
    this.age = age;
    this.breedId = breedId;
    this.sex = sex;
    this.dob = dob;
  }

  async save() {
    this.hasDiet = false;
    const pet = new PetModel(this);
    return await pet.save();
  }
  async getAll(userId) {
    return PetModel.find({ userId: userId, isDeleted: false }).populate({
      path: "breedId",
      populate: {
        path: "speciesId",
      },
    });
  }
  static async getById(id) {
    return PetModel.findById({ _id: id, isDeleted: false }).populate({
      path: "breedId",
      populate: {
        path: "speciesId",
      },
    });
  }
  static async setDietForPet(petId) {
    await PetModel.findByIdAndUpdate(petId, { hasDiet: true });
  }
  async updateById(id) {
    await PetModel.findByIdAndUpdate(id, this);
  }
  static async deleteById(id) {
    await PetModel.findByIdAndUpdate(id, { isDeleted: true });
  }
}

export { Pet };
