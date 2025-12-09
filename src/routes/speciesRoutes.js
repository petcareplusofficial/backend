import express from "express";
import { GetAllSpecies } from "../handlers/speciesHandlers.js";
import { AuthMiddleware } from "../middlewares/authMiddleware.js";

export default function speciesRoutes(services) {
  const router = express.Router();
  router.use(AuthMiddleware(services));

  router.get(`/`, GetAllSpecies());
  return router;
}
