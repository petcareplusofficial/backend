import { Reminder } from "../internal/db/reminder.js";
import { VaccinationHistory } from "../internal/db/vaccinationHistory.js";
import { Vaccination } from "../internal/db/vaccination.js";
import { Pet } from "../internal/db/pet.js";
import { AiService } from "../internal/ai/ollama.js";

const CreateVaccinationHistory = () => {
  return async (req, res) => {
    try {
      const { petId, vaccinationId } = req.params;
      const vaccination = await Vaccination.getById(vaccinationId);
      const vaccinationHistoryForPet =
        await VaccinationHistory.getAllByPetId(petId);
      const pet = await Pet.getById(petId);
      const petSpecs = {
        species: pet.breedId.speciesId.name,
        breed: pet.breedId.name,
        age: pet.age,
        weight: "15kg",
        activityLevel: "medium",
        health: "none",
        previousVaccinations: vaccinationHistoryForPet,
      };
      // console.log(petSpecs);
      const result = await AiService(
        "Generate this month's vaccination schedule",
        {
          petSpecs: petSpecs,
        },
        "vaccines",
      );
      for (let item of result) {
        // console.log("item", item);
        const vaccination = new Vaccination(
          item.vaccination,
          item.dayOfMonth,
          item.month,
          "vancouver",
        );
        await vaccination.save();
        // console.log("here", vaccination);
        const reminder = new Reminder(
          petId,
          item.dayOfMonth,
          item.month,
          vaccination.id,
          null,
        );
        await reminder.save();
      }

      const getRemindersByPet = await Reminder.getAllByPet(petId);
      // console.log("vaccination", vaccination);
      const vacBody = new VaccinationHistory(
        petId,
        vaccination.type,
        vaccination.date,
        vaccination.month,
        "Vancouver",
      );

      const vaccinationHistory = await vacBody.save();
      await Vaccination.deleteById(vaccinationId);
      res.status(201).json(getRemindersByPet);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
};

const GetVaccinationHistoryByPetId = () => {
  return async (req, res) => {
    try {
      const { petId } = req.params;
      const vaccinationHistory = await VaccinationHistory.getAllByPetId(petId);
      res.status(200).json(vaccinationHistory);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
};


const GetAllRemindersByPetId = () => {
  return async (req, res) => {
    try {
      const { petId } = req.params;
      const reminders = await Reminder.getAllByPet(petId);
      res.status(200).json(reminders);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
};

const GetAllRemindersNextWeekPetId = () => {
  return async (req, res) => {
    try {
      const { petId } = req.params;
      const reminders = await Reminder.getNextWeek(petId);
      res.status(200).json(reminders);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
};

export {
  GetAllRemindersByPetId,
  GetVaccinationHistoryByPetId,
  GetAllRemindersNextWeekPetId,
  CreateVaccinationHistory,
};
