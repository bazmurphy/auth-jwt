import express from "express";
import { getAllUsers } from "../controllers/userController";
import { verifyTokenMiddleware } from "../middleware/verifyTokenMiddleware";

export const userRouter = express.Router();

// Protected Route using the verifyToken Middleware
userRouter.get("/", verifyTokenMiddleware, getAllUsers);
