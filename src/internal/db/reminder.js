import mongoose from "mongoose";
import { VaccinationModel } from "./vaccination.js";
import { AppointmentModel } from "./appointment.js";
const ReminderSchema = new mongoose.Schema({
  petId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Pet",
  },
  day: {
    type: Number,
    default: () => new Date().getDate(),
  },
  vaccinationId: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: "Vaccination",
  },
  appointmentId: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: "Appointment",
  },
});
const ReminderModel = mongoose.model("Reminder", ReminderSchema);

class Reminder {
  constructor(petId, day, month, vaccinationId = null, appointmentId = null) {
    this.petId = petId;
    this.day = day;
    this.month = month;
    this.vaccinationId = vaccinationId;
    this.appointmentId = appointmentId;
  }
  async save() {
    const notification = new ReminderModel(this);
    await notification.save();
  }
  static async getAllByPet(petId) {
    return await ReminderModel.find({ petId })
      .populate("vaccinationId")
      .populate("appointmentId")
      .lean();
  }
  static async getNextWeek(petId) {
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    return ReminderModel.find({ petId, day: { $gte: nextWeek } })
      .populate("vaccinationId")
      .populate("appointmentId")
      .lean();
  }
}

export { ReminderModel, Reminder };
