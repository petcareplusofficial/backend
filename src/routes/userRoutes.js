import express from "express";
import { GetUser, DeleteUser, UpdateUser } from "../handlers/userHandlers.js";
import { AuthMiddleware } from "../middlewares/authMiddleware.js";

export default function userRoutes(services) {
  const router = express.Router();
  router.use(AuthMiddleware(services));

  // router.get(`/`, GetAllUsers());
  router.get(`/`, GetUser());
  router.delete(`/`, DeleteUser(services));
  router.put(`/`, services.upload.single("image"), UpdateUser());
  return router;
}
