import express from "express";
import { AuthMiddleware } from "../middlewares/authMiddleware.js";
import {
  GetAllRemindersByPetId,
  GetVaccinationHistoryByPetId,
  GetAllRemindersNextWeekPetId,
  CreateVaccinationHistory,
} from "../handlers/reminderHandlers.js";
export default function reminderRoutes(services) {
  const router = express.Router();
  router.use(AuthMiddleware(services));

  router.get("/pet/:petId", GetAllRemindersByPetId());
  router.get("/pet/:petId/vaccinationshistory", GetVaccinationHistoryByPetId());
  router.get("/pet/:petId/week", GetAllRemindersNextWeekPetId());
  router.post(
    "/pet/:petId/vaccinations/:vaccinationId",
    CreateVaccinationHistory(),
  );

  return router;
}
