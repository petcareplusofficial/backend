import mongoose from "mongoose";
import { VetModel } from "./vet.js";
const AppointmentSchema = new mongoose.Schema({
  vetId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vet",
    required: true,
  },
  petId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pet",
    required: true,
  },
  isNewPatient: {
    type: Boolean,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  hour: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled"],
    default: "pending",
  },
  notes: {
    type: String,
    required: false,
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
const AppointmentModel = mongoose.model("Appointment", AppointmentSchema);

class Appointment {
  constructor({
    userId,
    petId,
    isNewPatient,
    reason,
    date,
    hour,
    status,
    notes,
  }) {
    this.vetId = userId;
    this.petId = petId;
    this.isNewPatient = isNewPatient;
    this.reason = reason;
    this.date = date;
    this.hour = hour;
    this.status = status;
    this.notes = notes;
  }
  async save() {
    this.status = "pending";
    const appointment = new AppointmentModel(this);
    await appointment.save();
  }
  static async getAllByUserId(userId) {
    return AppointmentModel.find({ userId }).populate({
      path: "vetId",
    });
  }
  static async getById(id) {
    return AppointmentModel.findById(id).populate({
      path: "vetId",
    });
  }
  static async getAllByUserAndStatusAndPet(status, petId) {
    const query = { petId };

    if (status) {
      query.status = status;
    }
    return AppointmentModel.find(query).sort({ date: 1 }).populate({
      path: "vetId",
    });
  }
  static async getAllByUserAndPet(userId, petId) {
    return AppointmentModel.find({ userId, petId }).sort({ date: 1 }).populate({
      path: "vetId",
    });
  }
  async update(id, data) {
    await AppointmentModel.findByIdAndUpdate(id, data);
  }
  static async cancel(id) {
    await AppointmentModel.findByIdAndUpdate(id, { status: "cancelled" });
  }
}
export { Appointment, AppointmentModel };
