import express from "express";
import { AuthMiddleware } from "../middlewares/authMiddleware.js";
import {
  CreateDiet,
  GetDietByPetId,
  RefreshMeal,
} from "../handlers/dietHandlers.js";

export default function dietRoutes(services) {
  const router = express.Router();
  router.use(AuthMiddleware(services));

  router.post("/", CreateDiet());
  router.get("/pets/:id", GetDietByPetId());
  router.put("/:dietId/meals/:mealId", RefreshMeal());

  return router;
}
