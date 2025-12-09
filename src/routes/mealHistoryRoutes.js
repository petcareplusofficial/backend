import express from "express";
import { AuthMiddleware } from "../middlewares/authMiddleware.js";
import {
  createMealHistory,
  getAllMealHistoriesWithTimeQuery,
} from "../handlers/mealHistoryHandlers.js";
export default function mealHistoryRoutes(services) {
  const router = express.Router();
  router.use(AuthMiddleware(services));

  router.all("/", createMealHistory);
  router.get("/pets/:petId", getAllMealHistoriesWithTimeQuery);

  return router;
}
