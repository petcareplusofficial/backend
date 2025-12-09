import express from "express";
import { AuthMiddleware } from "../middlewares/authMiddleware.js";
import {
  GetPets,
  GetPet,
  CreatePet,
  UpdatePet,
  DeletePet,
} from "../handlers/petHandlers.js";
export default function petRoutes(services) {
  const router = express.Router();
  router.use(AuthMiddleware(services));

  router.get("/", GetPets());
  router.get("/:id", GetPet());
  router.post("/", services.upload.single("image"), CreatePet());
  router.put("/:id", services.upload.single("image"), UpdatePet());
  router.delete("/:id", DeletePet());

  return router;
}
