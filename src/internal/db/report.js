import mongoose from "mongoose";
import { VaccinationModel } from "./vaccination.js";
// this might get changed in the future according to
// what the pdf will be like (from what we decide)
const ReportSchema = new mongoose.Schema({
  petId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pet",
    required: true,
  },
  vaccinationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vaccination",
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  month: {
    type: String,
    required: true,
    enum: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
  },
  year: {
    type: Number,
    required: true,
  },
  bmi: {
    type: Number,
    required: true,
  },
  respiratoryRate: {
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
  isDeleted: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

ReportSchema.virtual("vaccinations", {
  ref: "Vaccination",
  localField: "vaccinationId",
  foreignField: "_id",
  justOne: true,
});
ReportSchema.set("toObject", { virtuals: true });
ReportSchema.set("toJSON", { virtuals: true });

const ReportModel = mongoose.model("Report", ReportSchema);

class Report {
  constructor(
    petId,
    vaccinationId,
    height,
    weight,
    month,
    year,
    bmi,
    respiratoryRate,
    heartRate,
    bloodPressure,
  ) {
    this.petId = petId;
    this.vaccinationId = vaccinationId;
    this.height = height;
    this.weight = weight;
    this.month = month;
    this.year = year;
    this.bmi = bmi;
    this.respiratoryRate = respiratoryRate;
    this.heartRate = heartRate;
    this.bloodPressure = bloodPressure;
  }
  async save() {
    const report = new ReportModel(this);
    await report.save();
  }
  static async getById(id) {
    return await ReportModel.findById(id).populate("vaccinations");
  }
static async getByPetIdMonthAndYear(petId, month, year) {
  const query = { petId, year };

  if (month) {
    query.month = month;
  }

  return await ReportModel.find(query)
    .sort({ createdAt: -1 })
    .populate("vaccinations")
    .exec();
}


  static async getByPetIdAndYear(petId, year) {
    return await ReportModel.find({ petId, year }).populate("vaccinations");
  }
  static async getAll() {
    return await ReportModel.find();
  }
  static async getLatestReportByPetId(petId) {
    return await ReportModel.findOne({ petId })
      .sort({ createdAt: -1 })
      .populate("vaccinations");
  }
}

export { Report };
// static async getLatestReportByPetId(petId) {
//   const reports = await ReportModel.find({ petId });
//   if (reports.length != 0) {
//     return null;
//   }
//   const monthOrder = {
//     January: 1,
//     February: 2,
//     March: 3,
//     April: 4,
//     May: 5,
//     June: 6,
//     July: 7,
//     August: 8,
//     September: 9,
//     October: 10,
//     November: 11,
//     December: 12,
//   };

//   const latest = reports.sort((a, b) => {
//     if (b.year !== a.year) return b.year - a.year;
//     return monthOrder[b.month] - monthOrder[a.month];
//   })[0];

//   return await ReportModel.findById(latest._id).populate("vaccinations");
// }
// }
