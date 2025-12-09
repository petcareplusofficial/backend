import express from "express";
import { AuthMiddleware } from "../middlewares/authMiddleware.js";
import {
  GetAllUserAppointments,
  CreateAppointment,
  GetAppointmentById,
  CancelAppointment,
  GetAllAppointmentsByPetIdAndUserId,
  UpdateAppointment,
} from "../handlers/appointmentsHandlers.js";

export default function appointmentRoutes(services) {
  const router = express.Router();
  router.use(AuthMiddleware(services));

  router.get(`/`, GetAllUserAppointments());
  router.post(`/`, CreateAppointment());
  router.get(`/:id`, GetAppointmentById());
  router.delete(`/:id`, CancelAppointment());
  router.get(`/pet/:petId`, GetAllAppointmentsByPetIdAndUserId());
  router.put(`/:id`, UpdateAppointment());
  return router;
}
