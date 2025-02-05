import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import controller from "../controller/controller.js";

export const router = express.Router();



router.post("/login", controller.login);
router.get("/protected", authMiddleware, controller.protectedRoute);
