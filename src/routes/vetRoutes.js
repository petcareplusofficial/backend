import express from "express";
import { AuthMiddleware } from "../middlewares/authMiddleware.js";
import { GetVets, GetVet } from "../handlers/vetHandlers.js";
export default function vetRoutes(services) {
  const router = express.Router();
  router.use(AuthMiddleware(services));

  router.get("/", GetVets());
  router.get("/:id", GetVet());

  return router;
}
