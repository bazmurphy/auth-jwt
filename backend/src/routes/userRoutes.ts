import express from "express";
import { getUsers } from "../controllers/userController";
import { verifyToken } from "../middleware/verifyToken";

export const userRouter = express.Router();

// Protected Route using the verifyToken Middleware
userRouter.get("/users", verifyToken, getUsers);
