import mongoose from "mongoose";
// this might get changed in the future according to
// what the pdf will be like (from what we decide)
const VaccinationHistorySchema = new mongoose.Schema({
  petId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pet",
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  date: {
    type: Number,
    required: true,
  },
  month: {
    type: Number,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  place: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const VaccinationHistoryModel = mongoose.model(
  "VaccinationHistory",
  VaccinationHistorySchema,
);

class VaccinationHistory {
  constructor(petId, type, date, month, place) {
    this.petId = petId;
    this.month = month;
    this.type = type;
    this.date = date;
    this.place = place;
  }
  async save() {
    const vaccination = new VaccinationHistoryModel(this);
    this.id = String(vaccination._id);
    return await vaccination.save();
  }
  static async getById(id) {
    return await VaccinationHistoryModel.findById(id);
  }
  static async getAllByPetId(petId) {
    return await VaccinationHistoryModel.find({ petId });
  }
}

export { VaccinationHistory, VaccinationHistoryModel };
