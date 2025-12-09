import { Report } from "../internal/db/report.js";
import { Vaccination } from "../internal/db/vaccination.js";
const CreateReport = () => async (req, res) => {
  try {
    const {
      petId,
      height,
      weight,
      month,
      year,
      bmi,
      respiratoryRate,
      heartRate,
      bloodPressure,
      type,
      vaccineDay,
      vaccineMonth,
      place,
    } = req.body;

    const vaccine = new Vaccination(type, vaccineDay, vaccineMonth, place);
    await vaccine.save();
    console.log(vaccine);
    const report = new Report(
      petId,
      vaccine.id,
      height,
      weight,
      month,
      year,
      bmi,
      respiratoryRate,
      heartRate,
      bloodPressure,
    );
    console.log(report);
    await report.save();
    res.status(201).json(report);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const GetLatestReportByPetId = () => async (req, res) => {
  const petId = req.params.petId;
  const report = await Report.getLatestReportByPetId(petId);
  res.status(200).json(report);
};

const GetReportByPetIdMonthAndYear = () => async (req, res) => {
  const petId = req.params.petId;
  const { month, year } = req.query;
  // console.log(petId, month, year);
  const report = await Report.getByPetIdMonthAndYear(petId, month, year);
  res.status(200).json(report);
};

export { CreateReport, GetReportByPetIdMonthAndYear, GetLatestReportByPetId };
