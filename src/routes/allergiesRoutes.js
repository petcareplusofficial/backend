import express from "express";
import { AuthMiddleware } from "../middlewares/authMiddleware.js";
import {
  GetAllergiesByPetId,
  CreateAllergy,
} from "../handlers/allergiesHandlers.js";
export default function allergiesRoutes(services) {
  const router = express.Router();
  router.use(AuthMiddleware(services));

  router.get("/pets/:id", GetAllergiesByPetId());
  router.post("/", CreateAllergy());

  return router;
}
