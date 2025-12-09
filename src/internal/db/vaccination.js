import mongoose from "mongoose";
// this might get changed in the future according to
// what the pdf will be like (from what we decide)
const VaccinationSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  date: {
    type: Number,
    required: true,
  },
  month: {
    type: String,
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
const VaccinationModel = mongoose.model("Vaccination", VaccinationSchema);

class Vaccination {
  constructor(type, date, month, place) {
    this.type = type;
    this.date = date;
    this.month = month;
    this.place = place;
  }
  async save() {
    const vaccination = new VaccinationModel(this);
    this.id = String(vaccination._id);
    return await vaccination.save();
  }
  static async getById(id) {
    return await VaccinationModel.findById(id);
  }
  async getAll() {
    return await VaccinationModel.find();
  }
  static async deleteById(id) {
    return await VaccinationModel.findByIdAndDelete(id);
  }
}

export { Vaccination, VaccinationModel };
