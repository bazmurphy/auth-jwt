import express from "express";
import {
  registerUser,
  loginUser,
  verifyToken,
} from "../controllers/authController";

export const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.get("/verify", verifyToken);
