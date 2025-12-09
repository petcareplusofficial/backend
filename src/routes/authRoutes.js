import express from "express";
import {
  RegisterUser,
  LoginUser,
  LogoutUser,
} from "../handlers/authHandlers.js";
import { AuthMiddleware } from "../middlewares/authMiddleware.js";

export default function authRoutes(services) {
  const router = express.Router();

  router.post(`/register`, services.upload.single("image"), RegisterUser());
  router.post(`/login`, LoginUser(services));
  router.post(`/logout`, AuthMiddleware(services), LogoutUser(services));
  return router;
}
