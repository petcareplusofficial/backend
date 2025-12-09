import express from "express";
import { AuthMiddleware } from "../middlewares/authMiddleware.js";
import {
  CreateReport,
  GetReportByPetIdMonthAndYear,
  GetLatestReportByPetId,
} from "../handlers/reportHandlers.js";
export default function reportRoutes(services) {
  const router = express.Router();
  router.use(AuthMiddleware(services));

  router.post(`/`, CreateReport());
  router.get(`/pets/:petId`, GetReportByPetIdMonthAndYear());
  router.get(`/pets/:petId/latest`, GetLatestReportByPetId());
  return router;
}
